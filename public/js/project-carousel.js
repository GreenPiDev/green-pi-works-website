/**
 * Weichie-style 3D Curved Cylindrical WebGL Carousel (Three.js)
 * Clean, high-performance project showcase with exact Weichie 3D cylindrical geometry,
 * aspect-corrected SDF soft rounded corners, bottom-left project title and category overlays,
 * right & downward shifted carousel staging, synchronized bottom catalog legend pills,
 * smooth jitter-free drag physics, and modal integration.
 */
(function () {
  "use strict";

  function createCardTextureWithLabels(img, project) {
    var canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 874; // ~1.17 : 1 aspect ratio matching cardW: 2.40 / cardH: 2.05
    var ctx = canvas.getContext("2d");

    // 1. Draw Image Full-Bleed
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else {
      var grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, "#15803d");
      grad.addColorStop(1, "#071c10");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 2. Soft Gradient Scrim at Bottom-Left for maximum text readability
    var scrim = ctx.createLinearGradient(0, canvas.height - 250, 0, canvas.height);
    scrim.addColorStop(0, "rgba(0, 0, 0, 0)");
    scrim.addColorStop(0.45, "rgba(3, 16, 9, 0.58)");
    scrim.addColorStop(1, "rgba(2, 10, 6, 0.88)");
    ctx.fillStyle = scrim;
    ctx.fillRect(0, canvas.height - 250, canvas.width, 250);

    // 3. Project Category Badge & Title (Bottom-Left)
    var posX = 52;
    var posY = canvas.height - 48;

    // Category Tag (e.g. "WEB TASARIM" / "CRM ÇÖZÜMLERİ")
    if (project && project.category) {
      ctx.fillStyle = "#86efac";
      ctx.font = "bold 20px 'Space Grotesk', 'DM Sans', sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
      ctx.shadowBlur = 8;
      ctx.fillText(project.category.toUpperCase(), posX, posY - 44);
    }

    // Project Title (e.g. "Kurumsal Web Sitesi")
    if (project && project.title) {
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 36px 'Space Grotesk', 'DM Sans', sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
      ctx.shadowBlur = 12;
      ctx.fillText(project.title, posX, posY);
    }

    var tex = new THREE.CanvasTexture(canvas);
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.colorSpace = THREE.SRGBColorSpace || THREE.sRGBEncoding;
    return tex;
  }

  function initAssidProjectCarousel(root, userConfig) {
    if (!root || root.__assidInitialized) return;
    root.__assidInitialized = true;

    var projects = (userConfig && userConfig.projects) || [];
    if (!projects.length) return;

    if (typeof THREE === "undefined") {
      console.error("Three.js is required for Weichie 3D Carousel.");
      return;
    }

    var stage = root.querySelector(".assid-project-carousel__stage") || root.querySelector(".hero-carousel-wrap") || root;
    var legend = root.querySelector(".assid-project-carousel__legend") || document.querySelector(".assid-project-carousel__legend");

    stage.innerHTML = "";
    stage.style.position = "relative";
    stage.style.overflow = "visible";
    stage.style.width = "100%";
    stage.style.height = "100%";
    stage.style.cursor = "grab";
    stage.style.touchAction = "pan-y";
    stage.style.userSelect = "none";

    var canvasContainer = document.createElement("div");
    canvasContainer.className = "weichie-canvas-container";
    canvasContainer.style.position = "absolute";
    canvasContainer.style.inset = "0";
    canvasContainer.style.width = "100%";
    canvasContainer.style.height = "100%";
    canvasContainer.style.pointerEvents = "auto";
    stage.appendChild(canvasContainer);

    // ---- Three.js Scene & Camera Setup ------------------------------------

    var width = canvasContainer.clientWidth || window.innerWidth;
    var height = canvasContainer.clientHeight || window.innerHeight;

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.05, 7.5);
    camera.lookAt(0, 0, 0);

    var renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace || THREE.sRGBEncoding;
    canvasContainer.appendChild(renderer.domElement);

    // ---- Geometry & Shaders (Weichie 3D Cylindrical Arc) ------------------

    var cardCount = projects.length;
    var angleStep = (2 * Math.PI) / cardCount;
    var BASE_CARD_COUNT = 9;   // Tasarımın ayarlandığı kart sayısı
    var BASE_RADIUS = 3.65;    // 9 kart için yarıçap
    // Kart sayısı değişse de kartlar arası boşluk aynı kalsın
    var cylinderRadius = BASE_RADIUS * cardCount / BASE_CARD_COUNT;
    var cardW = 2.40;          // Horizontal rectangle close to square (~1.17 : 1)
    var cardH = 2.05;
    var cornerRadiusUV = 0.12; // Extra smooth, soft rounded corners

    // Subdivided plane bent along the cylinder radius
    var cardGeometry = new THREE.PlaneGeometry(cardW, cardH, 36, 1);
    var posAttr = cardGeometry.attributes.position;
    for (var i = 0; i < posAttr.count; i++) {
      var px = posAttr.getX(i);
      var theta = px / cylinderRadius;
      posAttr.setX(i, Math.sin(theta) * cylinderRadius);
      posAttr.setZ(i, Math.cos(theta) * cylinderRadius - cylinderRadius);
    }
    cardGeometry.computeVertexNormals();

    var vertexShader = [
      "varying vec2 vUv;",
      "varying vec3 vNormal;",
      "varying vec3 vWorldPos;",
      "void main() {",
      "  vUv = uv;",
      "  vNormal = normalize(normalMatrix * normal);",
      "  vec4 wp = modelMatrix * vec4(position, 1.0);",
      "  vWorldPos = wp.xyz;",
      "  gl_Position = projectionMatrix * viewMatrix * wp;",
      "}"
    ].join("\n");

    var cardFragmentShader = [
      "uniform sampler2D uTexture;",
      "uniform float uRadius;",
      "uniform float uHover;",
      "uniform float uOpacity;",
      "uniform vec2 uAspect;",
      "varying vec2 vUv;",
      "varying vec3 vNormal;",
      "varying vec3 vWorldPos;",
      "",
      "float roundedBoxSDF(vec2 p, vec2 b, float r) {",
      "  vec2 d = abs(p) - b + vec2(r);",
      "  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;",
      "}",
      "",
      "void main() {",
      "  // Aspect-corrected SDF for perfectly uniform, smooth rounded corners",
      "  vec2 p = (vUv - vec2(0.5)) * uAspect;",
      "  vec2 b = vec2(0.5) * uAspect;",
      "  float d = roundedBoxSDF(p, b, uRadius);",
      "  float alpha = 1.0 - smoothstep(-0.003, 0.003, d);",
      "  if (alpha < 0.01) discard;",
      "",
      "  vec4 tex = texture2D(uTexture, vUv);",
      "",
      "  // Soft directional light across the cylinder curve",
      "  vec3 lightDir = normalize(vec3(0.35, 0.85, 1.2));",
      "  float diff = max(dot(vNormal, lightDir), 0.0) * 0.14 + 0.88;",
      "",
      "  // Specular sheen on hover",
      "  vec3 viewDir = normalize(-vWorldPos);",
      "  vec3 halfDir = normalize(lightDir + viewDir);",
      "  float spec = pow(max(dot(vNormal, halfDir), 0.0), 18.0) * 0.18 * (uHover * 0.85 + 0.15);",
      "",
      "  // Soft outer edge stroke / highlight",
      "  float borderDist = abs(d);",
      "  float borderStroke = smoothstep(0.014, 0.0, borderDist);",
      "  float edgeLight = clamp((0.5 - vUv.y) * 0.45 + 0.5, 0.0, 1.0);",
      "  vec3 borderColor = mix(vec3(0.12, 0.16, 0.14), vec3(1.0, 1.0, 1.0), edgeLight);",
      "",
      "  vec3 color = tex.rgb * (diff + uHover * 0.08) + vec3(spec);",
      "  color = mix(color, borderColor, borderStroke * 0.22);",
      "",
      "  gl_FragColor = vec4(color, tex.a * alpha * uOpacity);",
      "}"
    ].join("\n");

    // ---- Build 3D Carousel Meshes (Shifted slightly right & lifted above catalog) -

    var carouselGroup = new THREE.Group();
    carouselGroup.rotation.x = -0.045; // signature Weichie arched horizon tilt
    carouselGroup.position.x = (width < 768) ? 0 : 0.72; // Shifted slightly right on desktop
    carouselGroup.position.z = BASE_RADIUS - cylinderRadius; // Ön kart kameraya aynı uzaklıkta kalsın
    carouselGroup.position.y = -0.14;                   // Lifted slightly upward to prevent overlap with catalog
    scene.add(carouselGroup);

    var cardPivots = [];
    var cardMeshes = [];
    var cardMaterials = [];
    var loadedImageElements = [];
    var categories = [];

    projects.forEach(function (project, index) {
      if (categories.indexOf(project.category) === -1) {
        categories.push(project.category);
      }

      var pivot = new THREE.Group();
      pivot.rotation.y = -index * angleStep;

      // Initial placeholder texture with title/category
      var initialTex = createCardTextureWithLabels(null, project);

      var mat = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          uTexture: { value: initialTex },
          uRadius: { value: cornerRadiusUV },
          uHover: { value: 0.0 },
          uOpacity: { value: 1.0 },
          uAspect: { value: new THREE.Vector2(cardW / cardH, 1.0) },
        },
        vertexShader: vertexShader,
        fragmentShader: cardFragmentShader,
      });

      var mesh = new THREE.Mesh(cardGeometry, mat);
      mesh.position.z = cylinderRadius;
      mesh.userData = { index: index, project: project, mat: mat };
      pivot.add(mesh);

      carouselGroup.add(pivot);

      cardPivots.push(pivot);
      cardMeshes.push(mesh);
      cardMaterials.push(mat);

      // Asynchronously load actual project image and composite with label
      var img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = function () {
        loadedImageElements[index] = img;
        var finalTex = createCardTextureWithLabels(img, project);
        mat.uniforms.uTexture.value = finalTex;
      };
      img.src = project.image;
    });

    // ---- Legend / Catalog Navigation -------------------------------------

    function renderLegend() {
      if (!legend) return;
      legend.innerHTML = "";
      categories = [];
      projects.forEach(function (project) {
        if (categories.indexOf(project.category) === -1) {
          categories.push(project.category);
        }
      });
      categories.forEach(function (cat) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "assid-project-carousel__legend-btn";
        btn.textContent = cat;
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          rotateToCategory(cat);
        });
        legend.appendChild(btn);
      });
      lastActiveCategory = null;
      updateLegend();
    }

    renderLegend();

    function updateProjects(newProjects) {
      if (!newProjects || !newProjects.length) return;
      projects = newProjects;
      projects.forEach(function (project, index) {
        if (cardMeshes[index]) {
          cardMeshes[index].userData.project = project;
          var cachedImg = loadedImageElements[index];
          if (cachedImg && cachedImg.complete) {
            var updatedTex = createCardTextureWithLabels(cachedImg, project);
            cardMaterials[index].uniforms.uTexture.value = updatedTex;
          } else {
            var img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = function () {
              loadedImageElements[index] = img;
              var updatedTex = createCardTextureWithLabels(img, project);
              cardMaterials[index].uniforms.uTexture.value = updatedTex;
            };
            img.src = project.image;
          }
        }
      });
      renderLegend();
    }

    root.__assidUpdateProjects = updateProjects;
    window.AssidProjectCarousel.update = updateProjects;
    window.AssidProjectCarousel.updateProjects = updateProjects;

    // ---- Rotation, Physics & Interaction (No Scroll-Wheel Hijack) ---------

    var rotationY = 0;
    var autoplaySpeed = 0.0020; // Rotates to the right (clockwise)
    var isDragging = false;
    var isHovering = false;
    var dragStartX = 0;
    var dragStartY = 0;
    var lastDragX = 0;
    var lastDragTime = 0;
    var dragVelocity = 0;
    var inertiaVelocity = 0;
    var isSnapping = false;
    var snapTargetRot = 0;

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2(-999, -999);
    var hoveredIndex = -1;

    function wrapAngle(rad) {
      var twoPi = Math.PI * 2;
      return ((rad % twoPi) + twoPi) % twoPi;
    }

    function rotateToCategory(cat) {
      var targetIndex = -1;
      for (var i = 0; i < projects.length; i++) {
        if (projects[i].category === cat) {
          targetIndex = i;
          break;
        }
      }
      if (targetIndex === -1) return;

      var targetAngle = targetIndex * angleStep;
      var diff = (targetAngle - rotationY) % (Math.PI * 2);
      if (diff > Math.PI) diff -= Math.PI * 2;
      if (diff < -Math.PI) diff += Math.PI * 2;

      snapTargetRot = rotationY + diff;
      isSnapping = true;
    }

    var lastActiveCategory = null;
    function updateLegend() {
      if (!legend) return;
      var closest = 0;
      var minDiff = Infinity;
      for (var i = 0; i < cardCount; i++) {
        var cardAngle = -i * angleStep;
        var totalAngle = wrapAngle(cardAngle + rotationY);
        var dist = Math.min(totalAngle, Math.PI * 2 - totalAngle);
        if (dist < minDiff) {
          minDiff = dist;
          closest = i;
        }
      }
      if (!projects[closest]) return;
      var cat = projects[closest].category;
      if (cat === lastActiveCategory) return;
      lastActiveCategory = cat;
      Array.prototype.forEach.call(legend.children, function (btn) {
        btn.classList.toggle("is-active", btn.textContent === cat);
      });
    }

    // Pointer events with pointer capture for buttery smooth dragging
    function onPointerDown(e) {
      if (e.target.closest(".assid-project-carousel__legend") || e.target.closest("button") || e.target.closest("a") || e.target.closest(".hero-actions")) return;
      isDragging = true;
      isSnapping = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      lastDragX = e.clientX;
      lastDragTime = performance.now();
      dragVelocity = 0;
      inertiaVelocity = 0;
      stage.style.cursor = "grabbing";

      try {
        if (stage.setPointerCapture) {
          stage.setPointerCapture(e.pointerId);
        }
      } catch (err) {}
    }

    function onPointerMove(e) {
      var rect = canvasContainer.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!isDragging) {
        // Raycast hover detection only when not dragging
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(cardMeshes);
        if (intersects.length > 0) {
          hoveredIndex = intersects[0].object.userData.index;
          stage.style.cursor = "pointer";
        } else {
          hoveredIndex = -1;
          stage.style.cursor = "grab";
        }
        return;
      }

      var now = performance.now();
      var dt = Math.max((now - lastDragTime) / 1000, 0.004);
      var dx = e.clientX - lastDragX;
      
      var sensitivity = 0.00065; // Heavily toned down for precise, smooth manual control
      rotationY += dx * sensitivity;

      // Low-pass filtered velocity calculation
      var instantVel = (dx * sensitivity) / dt;
      dragVelocity = dragVelocity * 0.45 + instantVel * 0.55;

      lastDragX = e.clientX;
      lastDragTime = now;
    }

    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      stage.style.cursor = "grab";

      try {
        if (stage.releasePointerCapture) {
          stage.releasePointerCapture(e.pointerId);
        }
      } catch (err) {}

      var totalDist = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);

      if (totalDist > 8) {
        // Apply smooth, gentle inertia (heavily reduced)
        var timeSinceLastMove = performance.now() - lastDragTime;
        if (timeSinceLastMove > 60) {
          dragVelocity = 0;
        }
        inertiaVelocity = Math.max(-0.16, Math.min(0.16, dragVelocity * 0.05));
      } else {
        // Click action: open project terminal modal
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(cardMeshes);
        if (intersects.length > 0) {
          var project = intersects[0].object.userData.project;
          if (project && typeof window.openProjectTerminal === "function") {
            window.openProjectTerminal(project);
            return;
          }
        }
      }
    }

    stage.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    stage.addEventListener("mouseenter", function () { isHovering = true; });
    stage.addEventListener("mouseleave", function () { 
      isHovering = false; 
      hoveredIndex = -1;
      mouse.set(-999, -999);
    });

    // NOTE: Wheel scroll event listener is omitted so mouse scrolling
    // operates standard webpage scrolling naturally without rotating the carousel.

    // Window Resize
    function onResize() {
      width = canvasContainer.clientWidth || window.innerWidth;
      height = canvasContainer.clientHeight || window.innerHeight;
      camera.aspect = width / height;

      if (width < 768) {
        camera.position.z = 8.6;
        carouselGroup.position.x = 0;
        carouselGroup.position.y = -0.05;
      } else {
        camera.position.z = 7.5;
        carouselGroup.position.x = 0.72; // Shifted slightly right on desktop
        carouselGroup.position.y = -0.14; // Lifted upward to stay clear of catalog pills
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener("resize", onResize);
    onResize();

    // ---- Animation Loop --------------------------------------------------

    var lastTime = performance.now();

    function animate(time) {
      var dt = Math.min((time - lastTime) / 1000, 0.033);
      lastTime = time;

      if (isDragging) {
        inertiaVelocity = 0;
      } else if (isSnapping) {
        var diff = snapTargetRot - rotationY;
        if (Math.abs(diff) < 0.0005) {
          rotationY = snapTargetRot;
          isSnapping = false;
        } else {
          rotationY += diff * (1 - Math.pow(0.85, dt * 60));
        }
      } else {
        // Inertia decay (calm, gentle damping)
        inertiaVelocity *= Math.pow(0.86, dt * 60);
        if (Math.abs(inertiaVelocity) < 0.00005) inertiaVelocity = 0;

        var currentAutoplay = (isHovering || hoveredIndex !== -1) ? 0 : autoplaySpeed;
        rotationY += (currentAutoplay + inertiaVelocity) * (dt * 60);
      }

      carouselGroup.rotation.y = rotationY;

      // Smooth hover uniforms on card materials
      for (var j = 0; j < cardMaterials.length; j++) {
        var targetHover = (j === hoveredIndex) ? 1.0 : 0.0;
        var currentHover = cardMaterials[j].uniforms.uHover.value;
        cardMaterials[j].uniforms.uHover.value += (targetHover - currentHover) * 0.15;
      }

      updateLegend();

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  window.AssidProjectCarousel = { init: initAssidProjectCarousel };
})();
