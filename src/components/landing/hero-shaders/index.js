import phaseTransitionShader from './phaseTransition';

export const heroShaderRegistry = {
  [phaseTransitionShader.id]: phaseTransitionShader,
};

export const defaultHeroShaderId = phaseTransitionShader.id;

export function getHeroShader(shaderId = defaultHeroShaderId) {
  const shader = heroShaderRegistry[shaderId];

  if (!shader) {
    throw new Error(`Unknown hero shader "${shaderId}". Available shaders: ${Object.keys(heroShaderRegistry).join(', ')}`);
  }

  return shader;
}
