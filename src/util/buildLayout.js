import { getShape } from './getShape';

export default async function buildLayout(json) {
  const layout = [];

  for (const comp of json.components) {
    console.log(comp.type, comp, await getShape(comp));
  }

  return layout;
};
