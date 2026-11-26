import { expect, test, type Locator } from '@playwright/test';

/** Lee el color de fondo calculado como RGB, aunque el navegador lo devuelva en oklch. */
async function backgroundRgb(locator: Locator): Promise<[number, number, number]> {
  return locator.evaluate((element) => {
    const color = getComputedStyle(element).backgroundColor;
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas 2D no disponible');
    context.fillStyle = color;
    context.fillRect(0, 0, 1, 1);
    const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
    return [r, g, b];
  });
}

test('interfaz / Botón principal en rojo y flujo de sorteo', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Nombre del participante').fill('Ana, Pedro, María, Luis, Sofía');
  await page.getByRole('button', { name: 'Agregar' }).click();
  await expect(page.getByRole('listitem')).toHaveCount(5);

  const drawButton = page.getByRole('button', { name: 'Sortear ganador' });
  const [r, g, b] = await backgroundRgb(drawButton);
  expect(r - g).toBeGreaterThan(80);
  expect(r - b).toBeGreaterThan(80);

  await drawButton.click();

  const result = page.getByRole('status');
  await expect(result).toContainText('¡Tenemos un ganador!');
  const winner = (await result.locator('p').nth(1).textContent())?.trim();
  expect(['Ana', 'Pedro', 'María', 'Luis', 'Sofía']).toContain(winner);
});
