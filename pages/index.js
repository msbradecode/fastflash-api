import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Placeholder for logic from index.js
  }, []);

  return (
    <>
      <Head>
        <title>Fastflash</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Roboto&display=swap" rel="stylesheet" />
      </Head>
      <body>
<!-- Loading Screen -->
<div id="loading-screen">
<div className="fastflash-loader">
<div className="circle"></div>
<div className="bolt"><i className="fas fa-bolt"></i></div>
</div>
<div className="loading-text">⚡ Fast Flash</div>
<div className="loading-subtext">Loading API Documentation...</div>
</div>
<div className="container">
<section className="hero fade-in">
<div className="title-container">
<i className="fas fa-bolt icon-title"></i>
<h2 id="apiTitle"></h2>
<div className="title-divider"></div>
</div>
<p>Simple API with easy and minimalistic integration for WhatsApp Bot Developers.</p>
<section id="apiLinks">
<a href="#" id="information" title="Information">
<i className="fas fa-info-circle"></i> Information API
        </a>
<a href="#" id="contactdev" title="Contact Dev">
<i className="fas fa-user"></i> Contact
        </a>
</section>
</section>
<div className="stats" id="status-boxes" style="margin-bottom: 2rem;">
<div>
<h3>Total Endpoint</h3>
<p id="total-endpoint">-</p>
</div>
<div>
<h3>Total Request</h3>
<p id="total-request">-</p>
</div>
</div>
<div className="search-container">
<input id="searchInput" placeholder="🔍 Search API endpoints..." type="text"/>
</div>
<section className="content">
<div className="tabs" id="tabs"></div>
<div className="api-list" id="api-list"></div>
</section>
</div>
<!-- Modal for API Response -->
<div className="modal" id="apiResponseModal">
<div className="modal-dialog">
<div className="modal-header">
<div>
<h5></h5>
<span></span>
</div>
<button className="btn-close" id="btn-close">×</button>
</div>
<div className="modal-body">
<div className="copy-section">
<span id="copyEndpointText"></span>
<button className="copy-button">
<i className="far fa-copy"></i> Copy
          </button>
</div>
<form id="paramForm" style="margin-bottom: 0.5rem"></form>
<button id="submitParamBtn" type="button">
<i className="fas fa-paper-plane"></i> Submit Request
        </button>
<div className="loading-spinner" id="apiResponseLoading" style="display: none;"></div>
<div className="d-none" id="apiResponseContent"></div>
</div>
</div>
</div>
<footer className="footer">
<div id="credits">© 2025 Fast Flash - Created by Ibra Decode</div>
<div className="contact">
<a id="githubLink" target="_blank" title="GitHub">
<i className="fab fa-github"></i>
</a>
<a id="whatsappLink" target="_blank" title="WhatsApp">
<i className="fab fa-whatsapp"></i>
</a>
<a id="youtubeLink" target="_blank" title="YouTube">
<i className="fab fa-youtube"></i>
</a>
</div>
</footer>
<script>
  // Sound effects
  function playSound(type) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let frequency;
    
    if (type === 'success') {
      frequency = [523.25, 659.25, 783.99]; // C5, E5, G5
    } else if (type === 'error') {
      frequency = [220, 185, 155]; // A3, F#3, D#3
    }
    
    frequency.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      }, index * 100);
    });
  }

  // Show notification
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i className="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => document.body.removeChild(notification), 500);
    }, 3000);
    
    playSound(type);
  }

  (async () => {
    const settings = await fetch("/settings.json").then(res => res.json());
    
    document.getElementById("icon").href = settings.favicon
    const head = document.head;
    
    const ogTags = [
      { property: 'og:title', content: settings.apititle },
      { property: 'og:description', content: "Simple API with easy and minimalistic integration for WhatsApp Bot Developers." },
      { property: 'og:image', content: settings.favicon },
      { property: 'og:url', content: window.location.href },
      { property: 'og:type', content: 'website' }
    ];
        
    ogTags.forEach(({ property, content }) => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', property);
      meta.setAttribute('content', content);
      head.appendChild(meta);
    });
  })()

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.container').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    
    // Show loading state for stats
    document.querySelectorAll('#status-boxes p').forEach(el => {
      el.innerHTML = '<div className="loading-spinner" style="width: 30px; height: 30px; margin: 0 auto;"></div>';
    });
    
    loadSettings().then(() => {
      setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
          document.getElementById('loading-screen').style.display = 'none';
          document.querySelector('.container').style.display = 'block';
          document.querySelector('footer').style.display = 'block';
          showNotification('Fast Flash API is ready!', 'success');
        }, 500);
      }, 2000);
    });
  });

  async function loadSettings() {
    const tabsContainer = document.getElementById("tabs");
    const apiList = document.getElementById("api-list");
    let currentEndpoint = "";
    let allAPIs = {};

    try {
      const [settings, apis] = await Promise.all([
        fetch("/settings.json").then(res => res.json()),
        fetch("/api/endpoints.json").then(res => res.json())
      ]);
      
      allAPIs = apis;

      document.getElementById("searchInput").addEventListener("input", function () {
        const query = this.value.toLowerCase();
        const matchedAPIs = {};

        Object.keys(allAPIs).forEach(category => {
          const filtered = allAPIs[category].filter(api =>
            api.name.toLowerCase().includes(query) ||
            (api.desc && api.desc.toLowerCase().includes(query)) ||
            api.path.toLowerCase().includes(query)
          );
          if (filtered.length) matchedAPIs[category] = filtered;
        });

        renderSearchResults(matchedAPIs);
      });

      const setContent = (id, property, value) => {
        const el = document.getElementById(id);
        if (el) el[property] = value;
      };

      setContent("page", "textContent", "" + settings.apititle || "Restapi - Fast Flash");
      setContent("apiTitle", "textContent", settings.apititle || "Fast Flash API");

      document.getElementById("githubLink").href = settings.github || "#";
      document.getElementById("whatsappLink").href = settings.whatsapp || "#";
      document.getElementById("youtubeLink").href = settings.youtube || "#";
      document.getElementById("information").href = settings.saluran || "#";
      document.getElementById("contactdev").href = settings.whatsapp || "#";

      Object.keys(apis).forEach((key, index) => {
        const button = document.createElement("button");
        button.className = `tab ${index === 0 ? "active" : ""}`;
        button.dataset.tab = key;
        button.innerText = key.charAt(0).toUpperCase() + key.slice(1);
        tabsContainer.appendChild(button);
      });

      function renderSearchResults(results) {
        apiList.innerHTML = "";

        Object.keys(results).forEach(category => {
          const categoryHeader = document.createElement("h2");
          categoryHeader.textContent = category;
          apiList.appendChild(categoryHeader);

          results[category].forEach((api, i) => {
            const card = createApiCard(api, i);
            apiList.appendChild(card);
          });
        });
      }

      function createApiCard(api, index) {
        const card = document.createElement("div");
        card.className = "api-card";

        let statusClass = "";
        if (api.status.toLowerCase().includes("maintenance")) statusClass = "danger";
        else if (api.status.toLowerCase().includes("beta")) statusClass = "warning";

        card.innerHTML = `
          <div className="api-info">
            <h3>${api.name}</h3>
            ${api.desc ? `<p>${api.desc}</p>` : ""}
            <span className="status ${statusClass}">${api.status}</span>
          </div>
          <button className="play-button" data-endpoint="${api.path}" data-api="${api.name}" data-desc="${api.desc}">
            <i className="fa-solid fa-play"></i> Try API
          </button>
        `;

        setTimeout(() => {
          card.style.animation = `cardEntrance 0.6s ease-out ${index * 0.1}s forwards`;
        }, 10);

        return card;
      }

      function renderAPIs(category) {
        apiList.innerHTML = "";
        const loadingPlaceholder = document.createElement('div');
        loadingPlaceholder.className = 'loading-spinner';
        loadingPlaceholder.style.margin = '2rem auto';
        apiList.appendChild(loadingPlaceholder);
        
        setTimeout(() => {
          apiList.innerHTML = "";
          apis[category].sort((a, b) => a.name.localeCompare(b.name)).forEach((api, i) => {
            const card = createApiCard(api, i);
            apiList.appendChild(card);
          });
        }, 300);
      }

      renderAPIs(Object.keys(apis)[0]);

      tabsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("tab")) {
          document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
          e.target.classList.add("active");
          renderAPIs(e.target.dataset.tab);
        }
      });

      document.addEventListener("click", (e) => {
        if (e.target.closest(".play-button")) {
          const btn = e.target.closest(".play-button");
          const endpoint = btn.getAttribute("data-endpoint");
          const api = btn.getAttribute("data-api");
          const desc = btn.getAttribute("data-desc");

          const paramForm = document.getElementById("paramForm");
          const submitBtn = document.getElementById("submitParamBtn");
          const modal = document.getElementById("apiResponseModal");

          document.getElementById("apiResponseContent").textContent = "";
          document.getElementById("apiResponseContent").classList.add("d-none");
          document.getElementById("apiResponseLoading").style.display = "none";
          paramForm.style.display = "block";
          submitBtn.style.display = "none";

          currentEndpoint = endpoint;
          paramForm.innerHTML = "";

          document.querySelector(".modal-dialog h5").innerText = api;
          document.querySelector(".modal-dialog span").innerText = desc;

          if (endpoint.includes("?")) {
            const queryParams = endpoint.split("?")[1].split("&");

            queryParams.forEach(param => {
              const [key, value] = param.split("=");
              paramForm.innerHTML += `
                <label for="${key}">${key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                <input type="text" id="${key}" name="${key}" value="${value || ''}" 
                       placeholder="Enter ${key}" required />
              `;
            });

            submitBtn.style.display = "block";
          } else {
            fetchAPI(endpoint);
          }
          
          modal.classList.add("active");
          document.querySelector(".copy-section").classList.add("active");
          document.getElementById("copyEndpointText").innerText = window.location.origin + endpoint;
        }

        if (e.target.closest(".copy-button")) {
          const textToCopy = document.getElementById("copyEndpointText").innerText;
          navigator.clipboard.writeText(textToCopy).then(() => {
            const copyBtn = e.target.closest(".copy-button");
            copyBtn.innerHTML = '<i className="fas fa-check"></i> Copied!';
            showNotification('URL copied to clipboard!', 'success');
            setTimeout(() => {
              copyBtn.innerHTML = '<i className="far fa-copy"></i> Copy';
            }, 2000);
          });
        }
        
        if (e.target.id === "btn-close" || e.target === document.getElementById("apiResponseModal")) {
          document.getElementById("apiResponseModal").classList.remove("active");
        }
      });

      document.getElementById("submitParamBtn").addEventListener("click", () => {
        const form = document.getElementById("paramForm");
        const submitBtn = document.getElementById("submitParamBtn");
        
        if (!form.checkValidity()) {
          form.reportValidity();
          showNotification('Please fill all required fields!', 'warning');
          return;
        }

        form.style.display = "none";
        submitBtn.style.display = "none";
        document.getElementById("apiResponseLoading").style.display = "block";
        
        let endpoint = currentEndpoint.split("?")[0] + "?";
        const inputs = form.querySelectorAll("input");
        
        inputs.forEach((input, index) => {
          endpoint += `${input.name}=${encodeURIComponent(input.value)}`;
          if (index < inputs.length - 1) endpoint += "&";
        });
        
        fetchAPI(endpoint);
      });
    } catch (error) {
      console.error("Failed to load settings:", error);
      showNotification('Failed to load API data!', 'error');
    }
  }    

  function fetchAPI(endpoint) {
    const fullURL = window.location.origin + endpoint;
    const responseEl = document.getElementById("apiResponseContent");
    const loadingEl = document.getElementById("apiResponseLoading");
    const urlsSection = document.querySelector(".copy-section");

    loadingEl.style.display = "block";
    responseEl.classList.add("d-none");
    responseEl.innerHTML = "";
    urlsSection.classList.add("active");
    document.getElementById("copyEndpointText").innerText = fullURL;
    
    showNotification('Processing your request...', 'success');

    fetch(fullURL)
      .then(async (res) => {
        loadingEl.style.display = "none";
        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          responseEl.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        } 
        else if (contentType && contentType.startsWith("image/")) {
          const blob = await res.blob();
          const imgUrl = URL.createObjectURL(blob);
          responseEl.innerHTML = `<img src="${imgUrl}" className="image-response" alt="API Response" />`;
        } 
        else if (contentType && contentType.startsWith("video/")) {
          const blob = await res.blob();
          const videoUrl = URL.createObjectURL(blob);
          responseEl.innerHTML = `
            <video controls className="video-response" autoplay>
              <source src="${videoUrl}" type="${contentType}">
              Your browser does not support the video tag.
            </video>
          `;
        }
        else if (contentType && contentType.startsWith("audio/")) {
          const blob = await res.blob();
          const audioUrl = URL.createObjectURL(blob);
          responseEl.innerHTML = `
            <audio controls className="audio-response" autoplay>
              <source src="${audioUrl}" type="${contentType}">
              Your browser does not support the audio tag.
            </audio>
          `;
        }
        else {
          const text = await res.text();
          responseEl.innerHTML = `<pre>${text.substring(0, 1000)}</pre>`;
        }

        responseEl.classList.remove("d-none");
        showNotification('API request completed successfully!', 'success');
      })
      .catch((err) => {
        loadingEl.style.display = "none";
        responseEl.classList.remove("d-none");
        responseEl.innerHTML = `<pre>Error: ${err.message}</pre>`;
        showNotification('API request failed!', 'error');
      });
  }
  
  // Load stats with loading state
  (function loadStats() {
    const statsLoading = document.createElement('div');
    statsLoading.className = 'loading-spinner';
    statsLoading.style.width = '30px';
    statsLoading.style.height = '30px';
    statsLoading.style.margin = '0 auto';
    
    document.getElementById('total-endpoint').innerHTML = '';
    document.getElementById('total-endpoint').appendChild(statsLoading.cloneNode());
    
    document.getElementById('total-request').innerHTML = '';
    document.getElementById('total-request').appendChild(statsLoading.cloneNode());
    
    fetch('/api/status')
      .then(res => res.json())
      .then(data => {
        document.getElementById('total-endpoint').textContent = data.result.totalfitur;
        document.getElementById('total-request').textContent = data.result.totalrequest;
      })
      .catch(err => {
        document.getElementById('total-endpoint').textContent = 'Error';
        document.getElementById('total-request').textContent = 'Error';
        console.error(err);
      });
  })();
</script>
</body>
    </>
  );
}
