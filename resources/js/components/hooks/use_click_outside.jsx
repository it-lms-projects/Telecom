import React, { useEffect } from "react";

/**
 * Custom hook that triggers a handler function when a click occurs outside of
 * all the specified elements.
 *
 * @param {Array<React.RefObject<HTMLElement>>} refs - An array of ref objects pointing to the elements to monitor.
 * @param {Function} handler - The function to call when a click outside occurs.
 * @param {string} eventType - The event type to listen for ('mousedown' or 'click'). Defaults to 'mousedown'.
 */
export function useClickOutside(refs, handler, eventType = 'mousedown') {
    useEffect(() => {
        // Ensure refs is an array
        const elements = (Array.isArray(refs) ? refs : [refs])
                                .map(ref => ref?.current) // Get the current element from each ref
                                .filter(Boolean); // Filter out any null/undefined refs

        if (elements.length === 0) {
            // No valid elements to track, maybe log a warning or do nothing
            // console.warn("useClickOutside: No valid refs provided.");
            return;
        }

        const listener = (event) => {
            // Do nothing if the event target is not available or not an Element
            if (!event.target || typeof event.target.contains !== 'function') {
                return;
            }
            
            // Check if the click target is inside *any* of the provided refs' elements
            const isInsideAnyRef = elements.some(element => element.contains(event.target));

            // If the click is *not* inside any of the refs, call the handler
            if (!isInsideAnyRef) {
                // Optional: Check if the target is still part of the document.
                // This can help prevent issues if the clicked element is removed
                // immediately after the click (though less common with mousedown).
                if (document.body.contains(event.target)) {
                    // console.log("click outside", event.target, ref.current);
                    // console.log("Click detected outside all refs:", event.target);
                    handler();
                }                
            }
        };
        // Validate event type
        const validEvent = eventType === 'click' ? 'click' : 'mousedown';
        const touchEvent = 'touchstart';

        document.addEventListener(validEvent, listener);
        document.addEventListener(touchEvent, listener);

        // Cleanup function
        return () => {
            document.removeEventListener(validEvent, listener);
            document.removeEventListener(touchEvent, listener);
        };

        // IMPORTANT: Dependency array
        // Re-run the effect if the handler changes or the *identity* of the refs array changes.
        // Ensure the `refs` array passed to this hook is stable (e.g., using useMemo or useState)
        // to prevent the effect from re-running on every render if the array is created inline.
        // We stringify ref.current presence to somewhat capture changes, though this isn't perfect.
        // A better approach is ensuring the parent passes a stable `refs` array.
    }, [refs, handler, eventType]); // Add eventType to dependencies
};