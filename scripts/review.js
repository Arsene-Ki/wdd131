const params = new URLSearchParams(window.location.search);
const countMessage = document.querySelector("#count-message");
const summary = document.querySelector("#summary");
const REVIEW_KEY = "reviewCount";

// Read the saved total, add one, and save it again.
function incrementReviewCount() {
  const saved = Number(localStorage.getItem(REVIEW_KEY)) || 0;
  const total = saved + 1;

  localStorage.setItem(REVIEW_KEY, total);
  return total;
}

function getReviewCount() {
  return Number(localStorage.getItem(REVIEW_KEY)) || 0;
}

function showCount(total) {
  const word = total === 1 ? "review" : "reviews";

  countMessage.textContent = `You have completed ${total} ${word} on this device.`;
}

function formatDate(value) {
  if (!value) {
    return "Not provided";
  }

  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString(undefined, { dateStyle: "long" });
}

function formatRating(value) {
  const rating = Number(value);

  if (!rating) {
    return "Not provided";
  }

  return `${"★".repeat(rating)}${"☆".repeat(5 - rating)} (${rating} out of 5)`;
}

// Turn the submitted form values into label/value pairs.
function buildEntries() {
  const product = products.find((item) => item.id === params.get("product"));
  const features = params.getAll("features");

  return [
    ["Product", product ? product.name : "Unknown product"],
    ["Overall rating", formatRating(params.get("rating"))],
    ["Date of installation", formatDate(params.get("install-date"))],
    ["Useful features", features.length > 0 ? features.join(", ") : "None selected"],
    ["Written review", params.get("written-review") || "No written review"],
    ["Reviewer", params.get("user-name") || "Anonymous"]
  ];
}

function showSummary(entries) {
  entries.forEach(([label, value]) => {
    const term = document.createElement("dt");
    const detail = document.createElement("dd");

    term.textContent = label;
    detail.textContent = value;
    summary.append(term, detail);
  });
}

if (params.has("product")) {
  showCount(incrementReviewCount());
  showSummary(buildEntries());
} else {
  showCount(getReviewCount());
  summary.textContent = "No review was submitted. Please use the review form.";
}
