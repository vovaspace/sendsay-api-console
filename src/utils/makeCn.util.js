import { BEM_NAMING } from '@/constants';


/*
  This code is a fork of '@bem-react/classname' library
  with the added CSS Modules handler.
*/


const stringify = (styles, block, elem, mods, mix) => {
  const resolveClassName = (className, warnOnUnresolved = true) => {
    const resolvedName = styles[className];

    if (IS_DEVELOPMENT && warnOnUnresolved && !resolvedName) {
      // eslint-disable-next-line no-console
      console.warn(`Unresolved className '${className}'`);
    }

    return resolvedName ?? '';
  };


  const entityName = elem ? `${block}${BEM_NAMING.element}${elem}` : block;
  let className = resolveClassName(entityName, false);


  if (mods) {
    const modPrefix = `${entityName}${BEM_NAMING.modifier}`;

    // eslint-disable-next-line no-restricted-syntax
    for (const mod in mods) {
      if (Object.prototype.hasOwnProperty.call(mods, mod)) {
        const value = mods[mod];
        let resolvedModClassName;

        if (value === true) {
          resolvedModClassName = resolveClassName(`${modPrefix}${mod}`);
        } else if (value) {
          resolvedModClassName = resolveClassName(`${modPrefix}${mod}${BEM_NAMING.modifierValue}${value}`);
        }

        if (resolvedModClassName) {
          className = `${className} ${resolvedModClassName}`;
        }
      }
    }
  }


  if (mix) {
    for (let i = 0; i < mix.length; i += 1) {
      const item = mix[i];

      if (item && typeof item === 'string') {
        const values = item.split(' ');

        for (let k = 0; k < values.length; k += 1) {
          const value = values[k];

          if (value !== entityName) {
            className = `${className} ${value}`;
          }
        }
      }
    }
  }


  return className;
};


export const makeCn = (scopeName, styles) => (elemOrMods, elemModsOrBlockMix, elemMix) => {
  if (typeof elemOrMods !== 'string') {
    return stringify(styles, scopeName, null, elemOrMods, elemModsOrBlockMix);
  }

  if (Array.isArray(elemModsOrBlockMix)) {
    return stringify(styles, scopeName, elemOrMods, null, elemModsOrBlockMix);
  }

  return stringify(styles, scopeName, elemOrMods, elemModsOrBlockMix, elemMix);
};
