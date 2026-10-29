// Embedded rooms return to the existing desk instead of reloading it.
if (window.parent !== window) {
  document.addEventListener("click", function(event) {
    const link = event.target.closest('a[href="index.html"]');
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.parent.postMessage({ type: "return-to-desk" }, "*");
  });
}
