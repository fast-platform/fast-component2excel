export default function isObject(a) {
  return (!!a) && (a.constructor === Object);
};
