import React from 'react';
import './About.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      <main className="about-container">
        <h1 className="text-3xl font-bold text-center text-agro-text mb-6">About AgroSanga</h1>

        <div className="section">
          <h2 className="section-heading">Our Mission & Vision</h2>
          <p>
            AgroSanga is on a mission to empower farmers by providing them with the intelligence and tools needed to cultivate a more prosperous future. Our vision is to secure the global food supply by making advanced, data-driven farming accessible to every farmer, regardless of their location or farm size.
          </p>
        </div>

        <div className="section">
          <h2 className="section-heading">The AgroSanga Advantage</h2>
          <p>
            We combine cutting-edge technology with deep agricultural expertise to give farmers an unparalleled advantage. Our platform provides the precise insights needed to optimize every aspect of the growing cycle, leading to higher yields and greater efficiency.
          </p>
          <ul className="section-list">
            <li><strong>AI-powered Yield Prediction:</strong> Our models analyze vast datasets to accurately forecast crop yields, helping you plan for a successful harvest.</li>
            <li><strong>Satellite Monitoring:</strong> Get real-time, plot-level data on crop health, moisture levels, and growth patterns, right at your fingertips.</li>
            <li><strong>Personalized Recommendations:</strong> Receive customized advice on irrigation, fertilization, and pest control, tailored specifically to your farm’s unique conditions.</li>
          </ul>
        </div>

        <div className="section">
          <h2 className="section-heading">Powered by Innovation</h2>
          <p>
            Our technology is built on a foundation of continuous innovation. We leverage AI, machine learning, and advanced remote sensing to deliver actionable insights. The platform's intuitive multi-language farmer app ensures that this powerful technology is accessible to all, breaking down language barriers and fostering global agricultural knowledge-sharing.
          </p>
        </div>

        <div className="section">
          <h2 className="section-heading">Impact & Reach</h2>
          <p>
            AgroSanga’s impact is measured in the success of the farmers we serve. By providing a scalable solution that works across diverse crops and regions, we are not just helping individual farmers thrive, but also contributing to the broader goal of food security. Our platform transforms challenges into opportunities, making sustainable and profitable farming a reality for millions.
          </p>
        </div>

        <div className="call-to-action">
          <p className="mb-4 text-center text-gray-700 font-medium">Ready to transform your farm with data-driven insights?</p>
          <a href="#" className="cta-button">Join AgroSanga Today</a>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
