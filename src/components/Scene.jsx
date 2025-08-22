import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerformance, useDeviceCapabilities, useIntersectionObserver } from '../hooks/usePerformance';
import CacheManager from './CacheManager';

// Cache management utilities
class SplineCache {
  static CACHE_KEY = 'spline_scene_cache_v1';
  static CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
  
  static async getFromCache() {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < this.CACHE_EXPIRY) {
          return data;
        }
        // Clear expired cache
        localStorage.removeItem(this.CACHE_KEY);
      }
    } catch (error) {
      console.warn('Cache retrieval failed:', error);
    }
    return null;
  }
  
  static async setCache(data) {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Cache storage failed:', error);
    }
  }
  
  static clearCache() {
    localStorage.removeItem(this.CACHE_KEY);
  }
}

const LoadingProgress = ({ progress, isLoaded, isSlowConnection, recommendations }) => {
  const progressWidth = useMemo(() => Math.min(progress * 100, 100), [progress]);
  
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center fixed inset-0 bg-gradient-to-br from-white/95 to-violet-50/95 backdrop-blur-sm z-50"
        >
          {/* Performance indicator */}
          {isSlowConnection && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 right-4 bg-orange-100 border border-orange-300 text-orange-700 px-3 py-2 rounded-lg text-sm"
            >
              Optimizing for slow connection...
            </motion.div>
          )}
          
          {/* Animated logo/icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              stiffness: 100,
              damping: 10
            }}
            className="relative mb-8"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-violet-500/30">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 border-4 border-white border-t-transparent rounded-full"
              />
            </div>
            
            {/* Pulse effect */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl"
            />
          </motion.div>
          
          {/* Progress bar */}
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-4 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressWidth}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full shadow-sm"
            />
          </div>
          
          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Preparing Awesomeness...
            </h3>
            <p className="text-sm text-gray-600">
              {progressWidth < 30 ? 'Initializing...' :
               progressWidth < 60 ? 'Loading assets...' :
               progressWidth < 90 ? 'Almost ready...' :
               'Finalizing...'}
            </p>
            <p className="text-xs text-violet-600 mt-1 font-semibold">
              {Math.round(progressWidth)}%
            </p>
          </motion.div>
          
          {/* Performance recommendations */}
          {recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-center"
            >
              {recommendations.map((rec, index) => (
                <p key={index} className="text-xs text-gray-500 mb-1">
                  💡 {rec.message}
                </p>
              ))}
            </motion.div>
          )}
          
          {/* Floating particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: [0, 1, 0], 
                y: [20, -20, 20],
                x: [0, Math.sin(i) * 20, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: i * 0.4,
                ease: "easeInOut"
              }}
              className={`absolute w-2 h-2 bg-violet-400 rounded-full`}
              style={{
                left: `${30 + i * 10}%`,
                top: `${40 + Math.sin(i) * 10}%`
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Scene() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [showCacheManager, setShowCacheManager] = useState(false);
  const [loadTime, setLoadTime] = useState(0);
  const splineRef = useRef(null);
  const retryCountRef = useRef(0);
  const loadStartTime = useRef(Date.now());
  const maxRetries = 3;
  
  // Performance hooks
  const { isSlowConnection, isOnline, getPerformanceRecommendations, preloadCriticalAssets } = usePerformance();
  const { capabilities, getOptimalQuality } = useDeviceCapabilities();
  const [setRef, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  
  const splineUrl = "https://prod.spline.design/yADUxi84L7oyr2Iy/scene.splinecode";
  
  // Get performance recommendations
  const recommendations = useMemo(() => getPerformanceRecommendations(), [getPerformanceRecommendations]);
  
  // Preload scene data
  useEffect(() => {
    const preloadScene = async () => {
      try {
        loadStartTime.current = Date.now();
        
        // Check cache first
        const cachedData = await SplineCache.getFromCache();
        if (cachedData) {
          setProgress(0.8); // Start with higher progress if cached
          return;
        }
        
        // Only preload if not on slow connection and scene is visible
        if (!isSlowConnection && isIntersecting) {
          preloadCriticalAssets([splineUrl]);
        }
        
      } catch (error) {
        console.warn('Preload failed:', error);
      }
    };
    
    preloadScene();
  }, [splineUrl, isSlowConnection, isIntersecting, preloadCriticalAssets]);
  
  const handleLoad = useCallback(async (splineApp) => {
    try {
      const endTime = Date.now();
      const totalLoadTime = endTime - loadStartTime.current;
      setLoadTime(totalLoadTime);
      
      setLoading(false);
      setProgress(100);
      setError(null);
      
      // Cache the scene data
      await SplineCache.setCache({
        url: splineUrl,
        timestamp: Date.now(),
        loadTime: totalLoadTime
      });
      
      // Store reference for later optimization
      splineRef.current = splineApp;
      
      // Optimize performance based on device capabilities
      if (splineApp && splineApp.setQuality) {
        const quality = getOptimalQuality();
        let qualityValue = 1.0;
        
        switch (quality) {
          case 'low':
            qualityValue = 0.6;
            break;
          case 'medium':
            qualityValue = 0.8;
            break;
          case 'high':
          default:
            qualityValue = 1.0;
            break;
        }
        
        // Additional reduction for slow connections
        if (isSlowConnection) {
          qualityValue *= 0.8;
        }
        
        splineApp.setQuality(qualityValue);
        console.log(`Spline quality set to: ${qualityValue} (${quality})`);
      }
      
      console.log(`Spline scene loaded successfully in ${totalLoadTime}ms`);
    } catch (error) {
      console.error('Error in load handler:', error);
    }
  }, [splineUrl, getOptimalQuality, isSlowConnection]);
  
  const handleProgress = useCallback((e) => {
    const progressPercent = e.percent || 0;
    setProgress(progressPercent);
    
    // Add some artificial delay for very fast connections to show loading state
    if (progressPercent > 0.9 && progressPercent < 1) {
      setTimeout(() => setProgress(1), isSlowConnection ? 500 : 200);
    }
  }, [isSlowConnection]);
  
  const handleError = useCallback((error) => {
    console.error('Spline loading error:', error);
    setError(error);
    
    // Retry logic with exponential backoff
    if (retryCountRef.current < maxRetries && !isRetrying) {
      setIsRetrying(true);
      retryCountRef.current++;
      
      const retryDelay = Math.min(1000 * Math.pow(2, retryCountRef.current), 8000);
      
      setTimeout(() => {
        setError(null);
        setLoading(true);
        setProgress(0);
        setIsRetrying(false);
        loadStartTime.current = Date.now(); // Reset timer
      }, retryDelay);
    }
  }, [isRetrying, maxRetries]);
  
  const retryLoad = useCallback(() => {
    SplineCache.clearCache(); // Clear cache on manual retry
    setError(null);
    setLoading(true);
    setProgress(0);
    retryCountRef.current = 0;
    loadStartTime.current = Date.now();
  }, []);
  
  // Don't load if not intersecting and on slow connection
  const shouldLoad = isIntersecting || !isSlowConnection;
  
  // Error boundary component
  if (error && retryCountRef.current >= maxRetries) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Scene Loading Failed
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            {!isOnline ? 'You appear to be offline.' : 'Unable to load the 3D scene. Please check your connection.'}
          </p>
          <button
            onClick={retryLoad}
            className="px-6 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors duration-200"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }
  
  // Show placeholder on slow connections until intersecting
  if (!shouldLoad) {
    return (
      <div 
        ref={setRef}
        className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-purple-50"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 text-sm">3D Scene will load when visible</p>
        </div>
      </div>
    );
  }
  
  return (
    <div ref={setRef} className="relative w-full h-screen">
      <LoadingProgress 
        progress={progress} 
        isLoaded={!loading} 
        isSlowConnection={isSlowConnection}
        recommendations={recommendations}
      />
      
      <div className={`w-full h-full transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Spline
          scene={splineUrl}
          onLoad={handleLoad}
          onProgress={handleProgress}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent'
          }}
        />
      </div>
      
      {/* Performance indicator and cache manager */}
      {(process.env.NODE_ENV === 'development' || window.location.search.includes('debug=true')) && (
        <div className="absolute top-4 right-4 space-y-2">
          <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-xs space-y-1 backdrop-blur">
            <div>{loading ? `Loading: ${Math.round(progress * 100)}%` : `Loaded (${loadTime}ms)`}</div>
            <div>Quality: {getOptimalQuality()}</div>
            <div>Connection: {isSlowConnection ? 'Slow' : 'Good'}</div>
            <div>Device: {capabilities.isMobile ? 'Mobile' : capabilities.isTablet ? 'Tablet' : 'Desktop'}</div>
            {retryCountRef.current > 0 && <div>Retry: {retryCountRef.current}</div>}
          </div>
          
          <button
            onClick={() => setShowCacheManager(true)}
            className="w-full bg-violet-500/90 text-white px-3 py-2 rounded-lg text-xs hover:bg-violet-600/90 transition-colors backdrop-blur"
          >
            Cache Manager
          </button>
        </div>
      )}
      
      {/* Cache Manager Modal */}
      <CacheManager 
        isVisible={showCacheManager}
        onClose={() => setShowCacheManager(false)}
      />
    </div>
  );
}


