import React from "react";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <div className="content-container">
      <div className="tos-container">
        <h1 className="tos-heading">Ilmasto Terms of Service</h1>

        <p className="tos-p">
          Welcome to Ilmasto, a weather information application that provides
          users with current weather conditions for their location. These Terms
          of Service ("Terms") govern your access and use of Ilmasto.
        </p>

        <br />
        <h2 className="tos-subheading">2. User Data</h2>
        <p className="tos-p">
          Ilmasto does not collect any personal user data.
        </p>

        <br />
        <h2 className="tos-subheading">3. Geolocation</h2>
        <p className="tos-p">
          Ilmasto uses your device's geolocation to determine your current
          location and provide relevant weather information. You can control
          geolocation permissions through your device settings.
        </p>

        <br />
        <h2 className="tos-subheading">4. API and Data Accuracy</h2>
        <p className="tos-p">
          Ilmasto relies on an external API to retrieve weather data. We do not
          confirm the accuracy or completeness of the provided information.
        </p>

        <br />
        <h2 className="tos-subheading">5. Term Changes</h2>
        <p className="tos-p">
          We reserve the right to update these Terms at any time. We will notify
          you of any material changes by posting the new Terms on the
          application.
        </p>

        <br />
        <h2 className="tos-subheading">6. Disclaimer</h2>
        <p className="disclaimer">
          Ilmasto is provided "as is" and without warranties of any kind,
          express or implied. We disclaim all liability for any damages arising
          out of your use of the application.
        </p>

        <br />
        <h2 className="tos-subheading">7. Governing Law</h2>
        <p className="tos-p">
          These Terms shall be governed by and construed in accordance with the
          laws of [Your Country].
        </p>

        <br />
        <h2 className="tos-subheading">8. Contact Us</h2>
        <p className="tos-p">
          If you have any questions regarding these Terms, please contact us at
          [Your Contact Information].
        </p>
      </div>
    </div>
  );
};

export default Terms;
