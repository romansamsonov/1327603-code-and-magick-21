'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;

const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const FONT_GAP = 20;

const BAR_X = 150;
const BAR_Y = 240;
const BAR_GAP = 50;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 140;


const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderText = function (ctx, text, x, y, color, baseline) {
  ctx.fillStyle = color;
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = baseline;
  ctx.fillText(text, x, y);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

const getBarColor = function (name) {
  let barColor = `hsl(240, 100%, ` + (100 * Math.random()) + `%)`;

  if (name === `Вы`) {
    barColor = `rgba(255, 0, 0, 1)`;
  }

  return barColor;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  renderText(
      ctx,
      `Ура вы победили!`,
      CLOUD_X + FONT_GAP,
      CLOUD_Y + FONT_GAP,
      `#000`,
      `hanging`
  );
  renderText(
      ctx,
      `Список результатов:`,
      CLOUD_X + FONT_GAP,
      CLOUD_Y + FONT_GAP * 2,
      `#000`,
      `hanging`
  );

  const maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    renderText(
        ctx,
        names[i],
        CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - FONT_GAP,
        `#000`,
        `hanging`
    );
    renderText(
        ctx,
        Math.floor(times[i]),
        CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - FONT_GAP * 2 - (BAR_HEIGHT * times[i]) / maxTime,
        `#000`,
        `bottom`
    );
    ctx.fillStyle = getBarColor(names[i]);
    ctx.fillRect(
        BAR_X + (BAR_WIDTH + BAR_GAP) * i,
        BAR_Y,
        BAR_WIDTH,
        -(BAR_HEIGHT * times[i]) / maxTime
    );
  }
};
