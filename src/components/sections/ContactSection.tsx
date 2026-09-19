"use client";

import { motion } from "motion/react";
import FormularioContacto from "../formulario";
import Image from "next/image";

const socials = [
  { icon: "/images/redes-sociales/icons8-instagram-50.svg", label: "Instagram", href: "https://www.instagram.com/ridecperu/" },
  { icon: "/images/redes-sociales/icons8-facebook-50.svg", label: "Facebook", href: "https://www.facebook.com/RIDECPERUOFICIAL" },
  { icon: "/images/redes-sociales/icons8-linkedin-50.svg", label: "LinkedIn", href: "https://www.linkedin.com/company/red-interuniversitaria-de-ciencia-ridec/" },
  { icon: "/images/redes-sociales/icons8-youtube-50.svg", label: "YouTube", href: "https://www.youtube.com/@ridec-peru5886" },
  { icon: "/images/redes-sociales/icons8-whatsapp-50.svg", label: "WhatsApp", href: "#" },
  { icon: "/images/redes-sociales/icons8-tiktok-50.svg", label: "TikTok", href: "https://www.tiktok.com/@ridecperu" },
];

export default function ContactSection() {
  return (
    <section className="contact-section">
      <div className="contact-section__inner">
        <motion.div
          className="contact-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Columna izquierda: formulario */}
          <div className="contact-form-col">
            <h2 className="contact-form-col__title">Ponte en contacto</h2>
            <p className="contact-form-col__subtitle">
              ¿Tienes preguntas, sugerencias o quieres ser parte de la red?
              Escríbenos y te responderemos pronto.
            </p>
            <FormularioContacto />
          </div>

          {/* Columna derecha: info */}
          <div className="contact-info-col">
            <h3 className="contact-info-col__heading">Información de contacto</h3>

            <div className="contact-info__items">
              <div className="contact-info__item">
                <span className="contact-info__icon">📧</span>
                <div>
                  <p className="contact-info__label">Email</p>
                  <p className="contact-info__value">ridecperu@gmail.com</p>
                </div>
              </div>

              <div className="contact-info__item">
                <span className="contact-info__icon">📱</span>
                <div>
                  <p className="contact-info__label">Teléfono</p>
                  <p className="contact-info__value">+51 --- --- ---</p>
                </div>
              </div>

              <div className="contact-info__item">
                <span className="contact-info__icon">📍</span>
                <div>
                  <p className="contact-info__label">Ubicación</p>
                  <p className="contact-info__value">Lima, Perú</p>
                </div>
              </div>
            </div>

            <div className="contact-social">
              <p className="contact-social__title">Síguenos</p>
              <div className="contact-social__grid">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social__link"
                    aria-label={s.label}
                  >
                    <Image src={s.icon} alt={s.label} width={24} height={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
