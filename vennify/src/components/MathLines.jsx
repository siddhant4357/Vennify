import React, { useEffect, useRef } from 'react';

const MathLines = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let points = [];
    
    // Set canvas size with device pixel ratio
    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };

    // Initial resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Adjust number of points based on screen size
    const getPointCount = () => {
      const width = window.innerWidth;
      if (width < 768) return 30; // Mobile
      if (width < 1024) return 40; // Tablet
      return 50; // Desktop
    };

    // Adjust connection distance based on screen size
    const getConnectionDistance = () => {
      const width = window.innerWidth;
      if (width < 768) return 100; // Mobile
      if (width < 1024) return 125; // Tablet
      return 150; // Desktop
    };

    // Create points
    const createPoints = () => {
      points = [];
      const pointCount = getPointCount();
      const speedMultiplier = window.innerWidth < 768 ? 0.75 : 1; // Slower on mobile

      for (let i = 0; i < pointCount; i++) {
        points.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 2 * speedMultiplier,
          vy: (Math.random() - 0.5) * 2 * speedMultiplier,
          connections: [],
          life: Math.random() * 100 + 100
        });
      }
    };

    createPoints();

    // Animation
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      const connectionDistance = getConnectionDistance();
      const lineWidth = window.innerWidth < 768 ? 0.5 : 1; // Thinner lines on mobile

      points.forEach((point, index) => {
        // Update position
        point.x += point.vx;
        point.y += point.vy;
        point.life--;

        // Bounce off walls
        if (point.x < 0 || point.x > window.innerWidth) point.vx *= -1;
        if (point.y < 0 || point.y > window.innerHeight) point.vy *= -1;

        // Remove dead points and create new ones
        if (point.life < 0) {
          points[index] = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            connections: [],
            life: Math.random() * 100 + 100
          };
          return;
        }

        // Find nearby points and draw lines
        points.forEach((otherPoint, otherIndex) => {
          if (index !== otherIndex) {
            const dx = point.x - otherPoint.x;
            const dy = point.y - otherPoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              const opacity = (1 - distance / connectionDistance) * (window.innerWidth < 768 ? 0.2 : 0.3);
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              
              // Create curve effect
              const midX = (point.x + otherPoint.x) / 2;
              const midY = (point.y + otherPoint.y) / 2;
              const offset = Math.sin(Date.now() / 1000) * (window.innerWidth < 768 ? 10 : 20);
              
              ctx.quadraticCurveTo(
                midX + offset,
                midY + offset,
                otherPoint.x,
                otherPoint.y
              );

              ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
              ctx.lineWidth = lineWidth;
              ctx.stroke();
            }
          }
        });

        // Draw points
        ctx.beginPath();
        ctx.arc(point.x, point.y, window.innerWidth < 768 ? 1 : 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default MathLines;