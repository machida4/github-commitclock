const convertToLocalTime = (utcDateString) => {
  const utcDate = new Date(utcDateString);
  return utcDate.toLocaleString(undefined, { timeZoneName: "short" });
};

const createLocalTimeSpan = (localTime) => {
  const localTimeSpan = document.createElement("span");
  localTimeSpan.textContent = ` (${localTime})`;

  localTimeSpan.style.color = "var(--fgColor-muted)";
  localTimeSpan.style.fontSize = "var(--text-body-size-small)";
  localTimeSpan.style.fontWeight = "400";
  localTimeSpan.style.paddingLeft = "var(--base-size-4, 4px)";

  return localTimeSpan;
};

const addLocalTimes = () => {
  const relativeTimeElements = document.querySelectorAll("relative-time");

  relativeTimeElements.forEach((element) => {
    if (element.dataset.localAdded) return;

    const utcTime = element.getAttribute("datetime");
    if (!utcTime) return;

    const localTime = convertToLocalTime(utcTime);
    const localTimeSpan = createLocalTimeSpan(localTime);
    element.after(localTimeSpan);

    element.dataset.localAdded = "true";
  });
};

const observer = new MutationObserver(() => {
  if (!/https:\/\/github\.com\/.+\/commits\/.+/.test(window.location.href)) {
    return;
  }
  addLocalTimes();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

addLocalTimes();
