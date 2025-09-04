module.exports = {
  apps: [{
    // Nome da sua aplicação no PM2
    name: 'cluster-api',

    // Caminho para o ponto de entrada da aplicação
    script: './src/cluster_initializer.js',

    // Habilita o modo cluster e cria uma instância por núcleo de CPU
    instances: 'max',
    exec_mode: 'cluster',

    // Habilita o watch para reiniciar a aplicação em mudanças (bom para dev)
    watch: ['src'],
    ignore_watch: ['node_modules'],

    // Não precisamos mais de 'interpreter' ou 'interpreter_args'
    // pois o PM2 executa .js nativamente.

    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    }
  }],
};