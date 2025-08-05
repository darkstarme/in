// plugins/vault.module.js
;(function (Monicare) {
  const VaultPlugin = {
    name: 'Vault',
    init(core) {
      // Insert your Vault API initialization here
      core.showToast('Vault plugin initialized', 'success');
      // Expose methods:
      this.getSecret = async (key) => {
        // stubbed: call your Vault backend
        return Promise.resolve('super-secret-value');
      };
      this.listSecrets = async () => {
        return Promise.resolve(['API_KEY', 'DB_PASS']);
      };
    }
  };

  Monicare.registerPlugin(VaultPlugin.name, VaultPlugin);
})(window.Monicare);