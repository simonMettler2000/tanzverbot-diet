import { calcDateOnDiet, Sex } from "./tanzverbot-diet";

test("Tanzverbot Diet", () => {
  expect(calcDateOnDiet(74, 100, 1.86, 38, Sex.Male)).toBeGreaterThan(0);
});

describe('calcDateOnDiet', () => {
  test('should calculate days needed for a male to gain weight', () => {
    const days = calcDateOnDiet(60, 65, 1.8, 25, Sex.Male);
    expect(days).toBeGreaterThan(0);
  });

  test('should calculate days needed for a female to gain weight', () => {
    const days = calcDateOnDiet(55, 60, 1.65, 30, Sex.Female);
    expect(days).toBeGreaterThan(0);
  });

  test('should throw if targetWeight is less than currentWeight', () => {
    expect(() => {
      calcDateOnDiet(70, 60, 1.75, 25, Sex.Male);
    }).toThrow('This diet is for gaining weight, not loosing it!');
  });

  test('should throw if age is too low', () => {
    expect(() => {
      calcDateOnDiet(50, 55, 1.6, 15, Sex.Female);
    }).toThrow('You do not qualify for this kind of diet.');
  });

  test('should throw if height is too low', () => {
    expect(() => {
      calcDateOnDiet(50, 55, 1.4, 20, Sex.Female);
    }).toThrow('You do not qualify for this kind of diet.');
  });

  test('should throw if daily excess calories are zero or negative', () => {
    // Manipuliere Input so, dass Grundumsatz > Essenskalorien
    expect(() => {
      calcDateOnDiet(200, 205, 2.0, 18, Sex.Male);
    }).toThrow('This diet is not sufficient for you to gain weight.');
  });
});