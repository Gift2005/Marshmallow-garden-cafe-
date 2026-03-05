// ── NAV MENU TOGGLE ──
const menuBtn = document.getElementById('menuBtn');
const navDropdown = document.getElementById('navDropdown');
const closeBtn = document.getElementById('closeMenuBtn');

if (menuBtn && navDropdown) {
  menuBtn.addEventListener('click', () => navDropdown.classList.add('open'));
}
if (closeBtn && navDropdown) {
  closeBtn.addEventListener('click', () => navDropdown.classList.remove('open'));
}
navDropdown?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navDropdown.classList.remove('open'));
});

// ── PHOTO UPLOAD HANDLER ──
// Maps each file input id to its corresponding image element id
const uploads = [
  { inputId: 'upload-hero',       imgId: 'img-hero'       },
  { inputId: 'upload-dining',     imgId: 'img-dining'     },
  { inputId: 'upload-garden',     imgId: 'img-garden'     },
  { inputId: 'upload-coffee',     imgId: 'img-coffee'     },
  { inputId: 'upload-menu-banner',imgId: 'img-menu-banner'},
  { inputId: 'upload-meals',      imgId: 'img-meals'      },
  { inputId: 'upload-desserts',   imgId: 'img-desserts'   },
  { inputId: 'upload-atmosphere', imgId: 'img-atmosphere' },
  { inputId: 'upload-team',       imgId: 'img-team'       },
  { inputId: 'upload-main-banner',imgId: 'img-main-banner'},
];

uploads.forEach(({ inputId, imgId }) => {
  const input = document.getElementById(inputId);
  const img   = document.getElementById(imgId);
  if (!input || !img) return;

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    img.src = url;
    img.style.display = 'block';
    // Hide the placeholder overlay once image is uploaded
    const placeholder = input.closest('.pg-item, .hero-banner, .banner-block')
                            ?.querySelector('.ph-inner, .hero-overlay, .banner-overlay');
    if (placeholder) placeholder.style.opacity = '0.15';
  });
});

// ── DYNAMIC "TODAY'S HOURS" STATUS ──
function getTodayStatus() {
  const now   = new Date();
  const day   = now.getDay(); // 0=Sun,1=Mon...6=Sat
  const hour  = now.getHours();
  const min   = now.getMinutes();
  const time  = hour + min / 60;

  const schedule = {
    0: { open: 9, close: 14, label: 'Sunday' },
    1: { open: 9, close: 17, label: 'Monday' },
    2: { open: 9, close: 17, label: 'Tuesday' },
    3: { open: 9, close: 17, label: 'Wednesday' },
    4: { open: 9, close: 17, label: 'Thursday' },
    5: { open: 9, close: 17, label: 'Friday' },
    6: { open: 9, close: 15, label: 'Saturday' },
  };

  const today = schedule[day];
  const isOpen = time >= today.open && time < today.close;
  const statusEl = document.getElementById('today-status');
  if (statusEl) {
    statusEl.textContent = isOpen ? '● Open Now' : '● Closed';
    statusEl.style.color = isOpen ? '#6aaa70' : '#cc7050';
  }
  const todayHoursEl = document.getElementById('today-hours');
  if (todayHoursEl) {
    const fmt = (h) => `${h}:00 ${h < 12 ? 'AM' : 'PM'}`;
    todayHoursEl.textContent = `${fmt(today.open)} – ${fmt(today.close)}`;
  }
}
getTodayStatus();
