import { useState, useEffect, useCallback } from 'react';

// Performance monitoring and cache management hook
export const usePerformance = () => {
  const [metrics, setMetrics] = useState({
    connectionType: 'unknown',
    isSlowConnection: false,
    memoryUsage: null,
    cacheSize: 0,
    isOnline: navigator.onLine
  });

  // Detect connection speed
  useEffect(() => {
    const updateConnectionInfo = () => {
      if ('connection' in navigator) {
        const conn = navigator.connection;
        const isSlowConnection = 
          conn.effectiveType === 'slow-2g' || 
          conn.effectiveType === '2g' || 
          (conn.downlink && conn.downlink < 1.5);
        
        setMetrics(prev => ({
          ...prev,
          connectionType: conn.effectiveType || 'unknown',
          isSlowConnection
        }));
      }
    };

    updateConnectionInfo();
    
    if ('connection' in navigator) {
      navigator.connection.addEventListener('change', updateConnectionInfo);
      return () => {
        navigator.connection.removeEventListener('change', updateConnectionInfo);
      };
    }
  }, []);

  // Monitor memory usage
  useEffect(() => {
    const updateMemoryInfo = () => {
      if ('memory' in performance) {
        setMetrics(prev => ({
          ...prev,
          memoryUsage: {
            used: performance.memory.usedJSHeapSize,
            total: performance.memory.totalJSHeapSize,
            limit: performance.memory.jsHeapSizeLimit
          }
        }));
      }
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 30000); // Update every 30s
    
    return () => clearInterval(interval);
  }, []);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setMetrics(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setMetrics(prev => ({ ...prev, isOnline: false }));
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Get cache size
  const getCacheSize = useCallback(async () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      return new Promise((resolve) => {
        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = (event) => {
          const size = event.data.size || 0;
          setMetrics(prev => ({ ...prev, cacheSize: size }));
          resolve(size);
        };
        
        navigator.serviceWorker.controller.postMessage(
          { type: 'GET_CACHE_SIZE' },
          [messageChannel.port2]
        );
      });
    }
    return 0;
  }, []);

  // Clear Spline cache
  const clearSplineCache = useCallback(async () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      return new Promise((resolve) => {
        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = (event) => {
          resolve(event.data.success);
        };
        
        navigator.serviceWorker.controller.postMessage(
          { type: 'CLEAR_SPLINE_CACHE' },
          [messageChannel.port2]
        );
      });
    }
    
    // Also clear localStorage cache
    localStorage.removeItem('spline_scene_cache_v1');
    return true;
  }, []);

  // Get performance recommendations
  const getPerformanceRecommendations = useCallback(() => {
    const recommendations = [];
    
    if (metrics.isSlowConnection) {
      recommendations.push({
        type: 'connection',
        message: 'Slow connection detected. Using optimized loading.',
        action: 'reduce_quality'
      });
    }
    
    if (metrics.memoryUsage && metrics.memoryUsage.used > metrics.memoryUsage.total * 0.8) {
      recommendations.push({
        type: 'memory',
        message: 'High memory usage detected.',
        action: 'reduce_detail'
      });
    }
    
    if (!metrics.isOnline) {
      recommendations.push({
        type: 'offline',
        message: 'You are offline. Showing cached content.',
        action: 'show_cached'
      });
    }
    
    return recommendations;
  }, [metrics]);

  // Preload critical assets
  const preloadCriticalAssets = useCallback((urls) => {
    if (metrics.isSlowConnection) {
      return; // Skip preloading on slow connections
    }
    
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });
  }, [metrics.isSlowConnection]);

  return {
    metrics,
    getCacheSize,
    clearSplineCache,
    getPerformanceRecommendations,
    preloadCriticalAssets,
    isSlowConnection: metrics.isSlowConnection,
    isOnline: metrics.isOnline
  };
};

// Device capability detection
export const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    hasTouch: false,
    hardwareConcurrency: navigator.hardwareConcurrency || 4,
    deviceMemory: navigator.deviceMemory || 4,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    preferredColorScheme: 'light'
  });

  useEffect(() => {
    const updateCapabilities = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setCapabilities(prev => ({
        ...prev,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        hasTouch: 'ontouchstart' in window,
        preferredColorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }));
    };

    updateCapabilities();
    window.addEventListener('resize', updateCapabilities);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateCapabilities);
    
    return () => {
      window.removeEventListener('resize', updateCapabilities);
      mediaQuery.removeEventListener('change', updateCapabilities);
    };
  }, []);

  const getOptimalQuality = useCallback(() => {
    const { isMobile, hardwareConcurrency, deviceMemory } = capabilities;
    
    if (isMobile || hardwareConcurrency < 4 || deviceMemory < 4) {
      return 'low'; // 0.6 quality
    } else if (hardwareConcurrency < 8 || deviceMemory < 8) {
      return 'medium'; // 0.8 quality
    } else {
      return 'high'; // 1.0 quality
    }
  }, [capabilities]);

  return {
    capabilities,
    getOptimalQuality
  };
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, options]);

  return [setRef, isIntersecting];
};
