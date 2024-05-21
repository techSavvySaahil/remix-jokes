export const sortKeyMapCheck = (key: string) => {
  switch (key) {
    case "name":
      return key;
    case "createdAt":
    default:
      return "createdAt";
  }
}