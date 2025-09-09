// Email notification utility for missing product alerts
const emailNotification = {
  async sendMissingProductAlert(productQuery, userMessage) {
    try {
      // In a real implementation, this would connect to an email service
      // For now, we'll create a database entry that can be processed by a background service
      
      const alertData = {
        type: 'missing_product',
        recipient: 'appdevynp@gmail.com',
        subject: `Missing Product Alert - ${productQuery}`,
        body: `
          A user has requested a product that is not available on our website:
          
          Product Query: ${productQuery}
          User Message: ${userMessage}
          Timestamp: ${new Date().toISOString()}
          
          Please consider adding this product to the website inventory.
        `,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      // Store alert in database for background processing
      await trickleCreateObject('email_alerts', alertData);
      
      // Log for development purposes
      console.log('Email alert queued:', alertData);
      
      return { success: true, alertId: Date.now() };
    } catch (error) {
      console.error('Error sending email alert:', error);
      return { success: false, error: error.message };
    }
  },

  async processPendingAlerts() {
    try {
      // Fetch pending email alerts
      const response = await trickleListObjects('email_alerts', 50, true);
      const pendingAlerts = response.items.filter(
        alert => alert.objectData.status === 'pending'
      );
      
      // In a real implementation, this would send actual emails
      for (const alert of pendingAlerts) {
        console.log('Processing email alert:', alert.objectData.subject);
        
        // Mark as processed
        await trickleUpdateObject('email_alerts', alert.objectId, {
          ...alert.objectData,
          status: 'sent',
          processedAt: new Date().toISOString()
        });
      }
      
      return { success: true, processed: pendingAlerts.length };
    } catch (error) {
      console.error('Error processing email alerts:', error);
      return { success: false, error: error.message };
    }
  }
};

window.emailNotification = emailNotification;