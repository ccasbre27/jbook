import * as esbuild from 'esbuild-wasm';


export const unpkgPathPlugin = () => {

  return {

    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {

      
      // cuando se busca el módulo del index.js
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a' };
      });

      // cuando se busca el módulo en un path relativo
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
        }
      });

      // cuando se busca el archivo principal del módulo
      build.onResolve({ filter: /.*/ }, async (args: any) => {

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        };

      });
      
    },
  };
};