const emailNotification = {
  async sendMissingProductAlert(productQuery, userMessage) {
    try {
      const alertData = {
        type: 'missing_product',
        recipient: 'admin@gadgetfinder.com',
        subject: `Missing Product Alert - ${productQuery}`,
        body: `Product Query: ${productQuery}\nUser Message: ${userMessage}\nTimestamp: ${new Date().toISOString()}`,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      console.log('Email alert queued:', alertData);
      
      return { success: true, alertId: Date.now() };
    } catch (error) {
      console.error('Error sending email alert:', error);
      return { success: false, error: error.message };
    }
  }
};

window.emailNotification = emailNotification;