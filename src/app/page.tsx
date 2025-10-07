'use client'

import React, { useState, useEffect } from 'react';
import { Shield, Phone, Mail, MapPin, Users, Clock, CheckCircle, Star, Menu, X, Send, ChevronDown, ArrowRight, Eye, UserCheck, AlertTriangle, Building, Camera } from 'lucide-react';
import Image from 'next/image';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('accueil');
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    service: '',
    message: ''
  });
  const [lightbox, setLightbox] = useState<{ type: 'image' | 'video'; src: string; poster?: string } | null>(null);

  const services = [
    {
      title: "Gardiennage Statique",
      description: "Surveillance permanente et contrôle d'accès pour vos sites sensibles",
      icon: Eye,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=400&fit=crop",
      features: ["Surveillance 24h/24", "Contrôle d'accès rigoureux", "Rondes de sécurité", "Intervention immédiate"]
    },
    {
      title: "Gardiennage Événementiel",
      description: "Sécurisation complète de vos événements et manifestations",
      icon: Users,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=400&fit=crop",
      features: ["Gestion de foule", "Contrôle VIP", "Coordination sécurité", "Plans d'évacuation"]
    },
    {
      title: "Protection Spécialisée",
      description: "Services de sécurité adaptés à vos besoins spécifiques",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=500&h=400&fit=crop",
      features: ["Maître-chien", "Protection rapprochée", "Inspection magasin", "Intervention après alarme"]
    },
    {
      title: "Pose de Détecteur de Fumée",
      description: "Installation professionnelle de détecteurs de fumée pour une sécurité incendie renforcée",
      icon: AlertTriangle,
      image: "https://images.unsplash.com/photo-1556910096-6f5e72db6809?w=500&h=400&fit=crop",
      features: [
        "NB: Détecteur de fumée offert",
        "Prix: 35.000 FCFA"
      ]
    },
    {
      title: "Pose Caméra + Configuration",
      description: "Mise en place de caméras de surveillance avec configuration et suivi mensuel",
      icon: Camera,
      image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?w=500&h=400&fit=crop",
      features: [
        "NB: Caméra offerte",
        "Prix: 185.000 FCFA"
      ]
    },
    {
      title: "Entretien Mensuel",
      description: "Maintenance et contrôle réguliers de vos dispositifs de sécurité",
      icon: Clock,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=400&fit=crop",
      features: [
        "NB: Vous bénéficiez de 2 mois d'entretien gratuite",
        "Prix: 10.000 FCFA"
      ]
    }
  ];

  // Galerie: placez vos fichiers dans le dossier public/ (ex: public/galerie1.jpg, public/video1.mp4)
  const galleryItems: Array<
    | { type: 'image'; src: string; alt: string }
    | { type: 'video'; src: string; poster?: string; alt: string }
  > = [
    { type: 'image', src: '/image1.jpeg', alt: 'Intervention de sécurité 1' },
    { type: 'image', src: '/imageEthansecurite.jpeg', alt: 'Surveillance de site' },
    { type: 'video', src: '/video1.mp4', poster: '/video1-poster.jpg', alt: 'Présentation des services' },
    { type: 'image', src: '/image2.jpeg', alt: 'Équipe en opération' },
    { type: 'video', src: '/video2.mp4', poster: '/video2-poster.jpg', alt: 'Sécurité événementielle' },
    { type: 'image', src: '/imageEthansecurite.jpeg', alt: 'Contrôle d\'accès' }
  ];

  const faqData = [
    {
      question: "Comment se déroule une formation pour devenir agent de gardiennage ?",
      answer: "Après sélection, la formation initiale dure plusieurs semaines avec des modules spécialisés : surveillance, contrôle d'accès, gestion d'urgence et secourisme."
    },
    {
      question: "Votre entreprise de gardiennage assure-t-elle une formation continue ?",
      answer: "Oui, nous assurons une formation continue pour maintenir les compétences de nos agents et leur permettre de réagir efficacement en toutes circonstances."
    },
    {
      question: "Votre agence de sécurité travaille-t-elle aussi à l'étranger ?",
      answer: "Dans le cadre de nos missions de protection des personnes, nos agents peuvent vous accompagner lors de vos déplacements internationaux."
    },
    {
      question: "Travaillez-vous dans le secteur public ou privé ?",
      answer: "Nous assurons toutes les missions de sécurité, aussi bien dans le privé que le public : entreprises, institutions, événements et particuliers."
    }
  ];

  const pointsForts = [
    {
      icon: Clock,
      title: "Rapidité d'intervention",
      description: "Rapidité de pouvoir apporter des solutions à l'ensemble de nos clients"
    },
    {
      icon: UserCheck,
      title: "Agents équipés professionnellement",
      description: "Nos agents sont équipés de tenues de protection individuelle et d'outils de sécurité"
    },
    {
      icon: Shield,
      title: "Protection des sites sensibles",
      description: "Spécialisés dans la protection des propriétés et guide d'entreprise"
    },
    {
      icon: Building,
      title: "Société fondée par un dirigeant expérimenté",
      description: "ETHAN SECURITE créé en 2025 avec une vision moderne de la sécurité"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage({
          type: 'success',
          text: result.message || 'Votre message a été envoyé avec succès !'
        });
        setFormData({
          nom: '',
          email: '',
          telephone: '',
          service: '',
          message: ''
        });
        // Fermer le modal après 2 secondes
        setTimeout(() => {
          setIsContactFormOpen(false);
          setSubmitMessage(null);
        }, 2000);
      } else {
        setSubmitMessage({
          type: 'error',
          text: result.error || 'Une erreur est survenue. Veuillez réessayer.'
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitMessage({
        type: 'error',
        text: 'Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-white to-white rounded-lg flex items-center justify-center transform rotate-12">
                  {/* <Shield className="w-7 h-7 text-white transform -rotate-12" /> */}
                  <Image src="/logo.svg" alt="Logo" width={80} height={80} />

                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ETHAN</h1>
                <p className="text-sm text-red-500 font-semibold tracking-wider">SECURITÉ</p>
                <p className="text-sm text-white font-semibold tracking-wider">Notre Engagement Votre Sécurité</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex space-x-8">
              {[
                { id: 'accueil', label: 'ACCUEIL' },
                { id: 'apropos', label: 'À PROPOS' },
                { id: 'services', label: 'SERVICES' },
                { id: 'contact', label: 'CONTACT' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium tracking-wider transition-colors ${
                    currentSection === item.id 
                      ? 'text-red-500' 
                      : 'text-white hover:text-red-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <a 
                href="tel:+24206781569"
                className="hidden md:flex bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded text-sm font-bold transition-colors items-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                +242 06 781 56 99
              </a>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-white hover:text-red-400"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-800 py-4">
              <div className="space-y-4">
                {[
                  { id: 'accueil', label: 'ACCUEIL' },
                  { id: 'apropos', label: 'À PROPOS' },
                  { id: 'services', label: 'SERVICES' },
                  { id: 'contact', label: 'CONTACT' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-white hover:text-red-400 py-2 text-sm font-medium tracking-wider"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen bg-black flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url('https://img.freepik.com/premium-photo/blackclad-security-guard-stands-watch-shopping-mall-entrance-concept-security-guard-black-clothing-shopping-mall-entrance_864588-74358.jpg?semt=ais_incoming&w=740&q=80')`
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl">
            <div className="inline-block bg-red-600/20 border border-red-600/30 rounded-full px-6 py-2 mb-8">
              <span className="text-red-400 text-sm font-medium tracking-wider">SERVICE 24H/24</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              ENTREPRISE DE<br />
              <span className="text-red-500">GARDIENNAGE</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
              {/* Gardiennage - Sécurité événementiel - Sécurité incendie - Sécurité numérique.<br/> */}
              ETHAN SECURITÉ est une société privée spécialisée dans la protection des biens, 
              particuliers, professionnels ainsi que la protection des sites sensibles, 
              des chantiers et autres installations stratégiques
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center"
              >
                Demander un devis
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center"
              >
                Nos services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Nos <span className="text-red-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions de sécurité adaptées à vos besoins spécifiques
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url('${service.image}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="text-red-400 text-sm font-medium tracking-wider">SERVICE</span>
                      <h3 className="text-2xl font-bold text-white mt-1">{service.title}</h3>
                    </div>
                    <div className="absolute top-6 right-6">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-5 h-5 text-red-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tarification Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                Nos <span className="text-red-600">Tarifs</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des tarifs transparents et compétitifs pour tous vos besoins de sécurité
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100 hover:border-red-200 transition-colors">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">Gardiennage du Mois</h3>
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-red-600 mb-2">230.000 FCFA</div>
                    <p className="text-gray-600">2 agents (matin et soir)</p>
                  </div>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span>Surveillance continue</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span>2 équipes d'agents</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span>Caution: 2 mois</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 border-2 border-red-200 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">POPULAIRE</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                    {/* <Shield className="w-8 h-8 text-white" /> */}
                    <Image src="/logo.svg" alt="Logo" width={80} height={80} />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">Gardiennage de Nuit</h3>
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-red-600 mb-2">130.000 FCFA</div>
                    <p className="text-gray-600">Protection nocturne</p>
                  </div>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span>Surveillance nocturne</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span>Rondes régulières</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span>Caution: 2 mois</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100 hover:border-red-200 transition-colors">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">Gardiennage de Jour (Fête)</h3>
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-red-600 mb-2">20.000 FCFA</div>
                    <p className="text-gray-600">Événements spéciaux</p>
                  </div>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span>Sécurité événementielle</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span>Gestion de foule</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span>Tarif par événement</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Pose Détecteur de Fumée */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100 hover:border-red-200 transition-colors">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">Pose de Détecteur de Fumée</h3>
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-red-600 mb-2">35.000 FCFA</div>
                    <p className="text-gray-600">NB: Détecteur de fumée offert</p>
                  </div>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span>Installation professionnelle</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span>Tests et vérifications</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pose Caméra + Configuration Mensuelle */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100 hover:border-red-200 transition-colors">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Camera className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">Pose Caméra + Configuration</h3>
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-red-600 mb-2">185.000 FCFA</div>
                    <p className="text-gray-600">NB: Caméra offerte</p>
                  </div>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span>Installation et configuration</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span>Suivi mensuel</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Entretien Mensuel */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100 hover:border-red-200 transition-colors">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">Entretien Mensuel</h3>
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-red-600 mb-2">10.000 FCFA</div>
                    <p className="text-gray-600">NB: 2 mois d'entretien gratuits</p>
                  </div>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span>Maintenance régulière</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span>Contrôles de performance</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Nos tarifs incluent la formation continue de nos agents et tous les équipements de sécurité nécessaires.
              </p>
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all"
              >
                Demander un devis personnalisé
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="apropos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
          <div className="inline-block text-red-600 font-bold text-lg mb-4 tracking-wider">
                  ETHAN SECURITÉ
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
                  Qui sommes-nous ?<br />
                  <span className="text-red-600">Votre sécurité</span> au centre de nos préoccupations
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  ETHAN SECURITÉ est une activité nationale qui répond aux besoins de ses différents 
                  clients en leur offrant des services de qualité en terme de sécurité.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Pour répondre aux différentes attentes de nos clients en matière de sécurité, 
                  nous offrons à nos clients des services de qualité et nos agents sont équipés 
                  de tenues de protection individuelle ainsi que des outils de sécurité.
                </p>

                <div className="bg-red-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-red-900 mb-4">Nos Points Forts</h3>
                  <div className="text-red-800">
                    <p className="mb-3">
                      <strong>Rapidité :</strong> Rapidité de pouvoir apporter des solutions à l'ensemble de nos clients.
                    </p>
                    <p>
                      Nous nous engageons à fournir des réponses rapides et efficaces pour tous vos besoins de sécurité, 
                      qu'il s'agisse de particuliers ou de professionnels.
                    </p>
                  </div>
                </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="relative">
                <div 
                  className="rounded-2xl h-96 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop')`
                  }}
                ></div>
                <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold">2025</div>
                    <div className="text-sm">Création</div>
                  </div>
                </div>
              </div>

              <div>
             

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pointsForts.map((point, index) => {
                    const Icon = point.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-black mb-2">{point.title}</h4>
                          <p className="text-sm text-gray-600">{point.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8">
                  <div className="bg-red-50 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-red-900 mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Nos Partenaires
                    </h4>
                    <p className="text-red-700 text-sm">
                      Nous travaillons en collaboration avec des partenaires de confiance 
                      pour vous offrir des services complets et de qualité.
                    </p>
                  </div>
                  {/* Mini section: Nos partenaires (text placeholders) */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-black mb-3">Nos partenaires :</h5>
                    <div className="flex flex-wrap gap-3">
                      {['Ethan Ascenseur', 'Ethan money', 'Taxiforfait', 'EE industry equipment'].map((name) => (
                        <span
                          key={name}
                          className="px-3 py-1 rounded-full bg-green-400 text-white font-bold text-xl"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    Notre entreprise se distingue par sa capacité à répondre rapidement aux besoins 
                    variés de nos clients, qu'ils soient particuliers ou professionnels.
                  </p>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-red-600 font-semibold flex items-center hover:text-red-700 transition-colors"
                  >
                    Plus d'infos
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie Section */}
      <section id="galerie" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                Notre <span className="text-red-600">Galerie</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez nos images et vidéos illustrant nos services de sécurité
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightbox(item)}
                  className="group relative block overflow-hidden rounded-xl bg-black focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {/* Thumbnail */}
                  {item.type === 'image' ? (
                    <div className="relative h-56 md:h-64">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    </div>
                  ) : (
                    <div className="relative h-56 md:h-64">
                      {/* Poster si disponible sinon fond sombre */}
                      {item.poster ? (
                        <Image
                          src={item.poster}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center opacity-90"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-900" />
                      )}
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-7 h-7 ml-1"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                    <span className="inline-block text-[11px] font-semibold tracking-wider uppercase px-2 py-1 rounded bg-black/60 text-white">
                      {item.type === 'image' ? 'Image' : 'Vidéo'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-white hover:text-red-400 p-2"
              aria-label="Fermer"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-black rounded-xl overflow-hidden">
              {lightbox.type === 'image' ? (
                <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
                  <Image
                    src={lightbox.src}
                    alt="Media"
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
                  <video
                    src={lightbox.src}
                    poster={lightbox.poster}
                    controls
                    autoPlay
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Vos <span className="text-red-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              Trouvez les réponses aux questions les plus fréquentes
            </p>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-red-600 flex-shrink-0 transition-transform ${
                        openFaq === index ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Nous <span className="text-red-600">Contacter</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Pour toute demande concernant nos différents services, vous pouvez nous joindre par téléphone 
              ou compléter notre formulaire. Nous reviendrons vers vous dans les meilleurs délais.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <a 
                href="tel:+24206781569"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-3" />
                +242 06 781 56 99
              </a>
              <a 
                href="tel:+24205555929"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-3" />
                +242 05 555 92 99
              </a>
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-3" />
                Formulaire
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Téléphones</h3>
                <div className="text-gray-600 space-y-2">
                  <p>+242 06 781 56 99</p>
                  <p>+242 05 555 92 99</p>
                  <p>+33 6 13 64 95 19</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Email & Web</h3>
                <div className="text-gray-600 space-y-2">
                  <p>info@ethan-securite.com</p>
                  <p>www.ethan-securite.com</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Adresse</h3>
                <p className="text-gray-600">
                  L'immeuble Groupe Dólice<br />
                  Avenue Paul Daumer<br />
                  Quartier Mpila<br />
                  Brazzaville, Congo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      {isContactFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-black">Demande de contact</h3>
              <button
                onClick={() => setIsContactFormOpen(false)}
                className="p-2 hover:bg-gray-100 bg-red-600 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Message de statut */}
              {submitMessage && (
                <div className={`p-4 rounded-lg ${
                  submitMessage.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  <div className="flex items-center">
                    {submitMessage.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 mr-2" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 mr-2" />
                    )}
                    {submitMessage.text}
                  </div>
                </div>
              )}

              <div>
              <div>
                <label className="block text-sm font-semibold text-black mb-3">Nom complet</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-black mb-3">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 text-blackrounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Téléphone</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Service demandé</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                >
                  <option value="">Sélectionnez un service</option>
                  <option value="gardiennage">Gardiennage Statique</option>
                  <option value="evenementiel">Gardiennage Événementiel</option>
                  <option value="protection">Protection Spécialisée</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none"
                ></textarea>
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full px-6 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-3" />
                    Envoyer la demande
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-white to-white rounded-lg flex items-center justify-center">
                    {/* <Shield className="w-7 h-7 text-white" /> */}
                    <Image src="/logo.svg" alt="Logo" width={80} height={80} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">ETHAN SECURITÉ</h3>
                    <p className="text-sm text-red-400">Notre Engagement Votre Sécurité</p>
                  </div>
                </div>
                <div className="space-y-3 text-gray-400">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                    <span className="text-sm">L'immeuble Groupe Dólice, Avenue Paul Daumer, Quartier Mpila, Brazzaville</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-red-500" />
                    <span className="text-sm">+242 06 781 56 99</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-red-500" />
                    <span className="text-sm">info@ethan-securite.com</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-6">Nos Services</h4>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-red-400 transition-colors">Gardiennage statique</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">Sécurité événementielle</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">Sécurité incendie</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">Sécurité numérique</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-6">Entreprise</h4>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-red-400 transition-colors">À propos</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">Nos valeurs</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">Carrières</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-6">Informations</h4>
                <div className="space-y-3 text-gray-400 text-sm">
                  <p>Autorisation ministérielle en cours</p>
                  <p>Police d'assurance professionnelle</p>
                  <p>Société créée en 2025</p>
                  <p>Formation continue des agents</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-400 text-sm mb-4 md:mb-0">
                  <p>&copy; 2025 ETHAN SECURITÉ SRL. Tous droits réservés.</p>
                </div>
                <div className="flex space-x-6 text-gray-400 text-sm">
                  <a href="#" className="hover:text-red-400 transition-colors">Plan du site</a>
                  <a href="#" className="hover:text-red-400 transition-colors">Mentions légales</a>
                  <a href="#" className="hover:text-red-400 transition-colors">Cookies</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;