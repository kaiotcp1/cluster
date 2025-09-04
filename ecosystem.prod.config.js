// ecosystem.prod.config.js
module.exports = {
  apps: [{
    name: 'cluster-api-prod',

    // Aponta para o arquivo JS compilado, que agora tem os caminhos corretos
    script: 'dist/main/index.js',

    exec_mode: 'cluster',
    instances: 'max',

    // Em produção, watch é desabilitado para performance e estabilidade
    watch: false,

    // Nenhuma configuração extra de 'node_args' ou 'interpreter' é necessária

    env: {
      NODE_ENV: 'production',
    }
  }],
};