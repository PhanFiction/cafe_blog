function parseImageField(data) {
  // If it's an array
  if (Array.isArray(data)) {
    return data.map(parseSingle);
  }

  // If it's a single object
  return parseSingle(data);
}

function parseSingle(item) {
  return {
    ...item,
    img:
      typeof item.img === "string"
        ? JSON.parse(item.img)
        : item.img
  };
}

module.exports = parseImageField;