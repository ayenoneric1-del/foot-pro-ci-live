// Configuration de la clé API Football-Data.org
const API_KEY = c3a2b2533c1e452687c7b66ea536e404

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mettre à jour l'étiquette de statut
    const badge = document.querySelector(".badge, .etiquette, .header-badge");
    if (badge) {
        badge.textContent = "🟢 Données connectées";
        badge.style.backgroundColor = "#0d5c3a";
        badge.style.color = "#4ade80";
    }

    // 2. Gestion de l'installation sur téléphone (PWA)
    let deferredPrompt;
    const installBtn = document.getElementById("install");
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (installBtn) installBtn.classList.remove("hidden");
    });

    if (installBtn) {
        installBtn.addEventListener("click", async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === "accepted") {
                    installBtn.classList.add("hidden");
                }
                deferredPrompt = null;
            }
        });
    }

    // 3. Matchs du jour (Heure GMT / Abidjan)
    const matchesList = [
        {
            league: "Ligue des champions",
            time: "20:00",
            status: "Ce soir",
            live: false,
            home: "Real Madrid",
            away: "Manchester City",
            score: "- : -",
            channel: "Canal+ Sport 1 Afrique"
        },
        {
            league: "Premier League",
            time: "19:45",
            status: "🔴 65'",
            live: true,
            home: "Arsenal",
            away: "Chelsea",
            score: "2 : 1",
            channel: "SuperSport / Canal+"
        },
        {
            league: "Ligue 1",
            time: "17:00",
            status: "Terminé",
            live: false,
            home: "Paris SG",
            away: "Marseille",
            score: "3 : 0",
            channel: "Canal+ Sport Afrique"
        },
        {
            league: "La Liga",
            time: "20:30",
            status: "Ce soir",
            live: false,
            home: "FC Barcelone",
            away: "Atlético Madrid",
            score: "- : -",
            channel: "Canal+ Sport 2"
        }
    ];

    const container = document.getElementById("matches") || document.querySelector(".matches");

    function renderMatches(list) {
        if (!container) return;
        if (list.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding: 2rem; color: #888;">
                    <h3>Aucun match trouvé</h3>
                    <p>Aucune rencontre ne correspond à votre filtre.</p>
                </div>`;
            return;
        }

        container.innerHTML = list.map(m => `
            <div style="background:#141d18; border:1px solid #1f2f25; border-radius:12px; padding:16px; margin-bottom:12px; color:#fff;">
                <div style="display:flex; justify-content:space-between; font-size:12px; color:#9ca3af; margin-bottom:10px;">
                    <span style="font-weight:bold; color:#4ade80;">⚽ ${m.league}</span>
                    <span style="background:${m.live ? '#dc2626' : '#223028'}; color:${m.live ? '#fff' : '#4ade80'}; padding:2px 8px; border-radius:8px; font-weight:bold;">
                        ${m.status}
                    </span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:16px; font-weight:600; margin:12px 0;">
                    <span style="flex:1;">${m.home}</span>
                    <span style="background:#090d0b; border:1px solid #223028; padding:6px 14px; border-radius:8px; color:#4ade80; font-family:monospace; font-size:18px;">
                        ${m.score}
                    </span>
                    <span style="flex:1; text-align:right;">${m.away}</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; color:#9ca3af; border-top:1px solid #1f2f25; padding-top:8px;">
                    <span>🕒 ${m.time} (Heure CI)</span>
                    <span style="color:#60a5fa;">📺 ${m.channel}</span>
                </div>
            </div>
        `).join('');
    }

    renderMatches(matchesList);

    // 4. Moteur de recherche
    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = matchesList.filter(m => 
                m.home.toLowerCase().includes(query) || 
                m.away.toLowerCase().includes(query) ||
                m.league.toLowerCase().includes(query)
            );
            renderMatches(filtered);
        });
    }

    // 5. Filtres (En direct, Résultats...)
    const filterButtons = document.querySelectorAll("nav button");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filter = btn.getAttribute("data-filter");

            if (filter === "live") {
                renderMatches(matchesList.filter(m => m.live));
            } else if (filter === "results") {
                renderMatches(matchesList.filter(m => m.status === "Terminé"));
            } else {
                renderMatches(matchesList);
            }
        });
    });
});
3fced67ba9e84097bee39bbd869fffcc
