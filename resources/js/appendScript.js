import { useEffect } from 'react';
export const appendScript = resourceUrl => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = resourceUrl;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, [resourceUrl]);
};
