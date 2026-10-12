export const normalizeBox = (box) => {
  if (!box) {
    return null;
  }

  if (Array.isArray(box)) {
    const [ymin, xmin, ymax, xmax] = box;

    return {
      xmin: Number(xmin),
      ymin: Number(ymin),
      xmax: Number(xmax),
      ymax: Number(ymax),
    };
  }

  return {
    xmin: Number(box.xmin),
    ymin: Number(box.ymin),
    xmax: Number(box.xmax),
    ymax: Number(box.ymax),
  };
};

export const getBoxStyle = (box) => {
  const normalized = normalizeBox(box);

  if (!normalized) {
    return null;
  }

  const { xmin, ymin, xmax, ymax } = normalized;

  if (
    !Number.isFinite(xmin) ||
    !Number.isFinite(ymin) ||
    !Number.isFinite(xmax) ||
    !Number.isFinite(ymax)
  ) {
    return null;
  }

  if ([xmin, ymin, xmax, ymax].every((value) => value >= 0 && value <= 1000)) {
    return {
      left: `${(xmin / 1000) * 100}%`,
      top: `${(ymin / 1000) * 100}%`,
      width: `${((xmax - xmin) / 1000) * 100}%`,
      height: `${((ymax - ymin) / 1000) * 100}%`,
    };
  }

  if ([xmin, ymin, xmax, ymax].every((value) => value >= 0 && value <= 1)) {
    return {
      left: `${xmin * 100}%`,
      top: `${ymin * 100}%`,
      width: `${(xmax - xmin) * 100}%`,
      height: `${(ymax - ymin) * 100}%`,
    };
  }

  return null;
};
