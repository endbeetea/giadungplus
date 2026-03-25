// Shared sidebar logic
const PAGES = {
  ketoan: { label: '💰 Kế Toán', file: 'ketoan.html' },
  cskh:   { label: '💬 CSKH',    file: 'cskh.html' },
  kho:    { label: '📦 Kho Vận', file: 'kho.html' },
  mkt:    { label: '📣 Marketing',file: 'mkt.html' },
  hcns:   { label: '👥 HCNS',    file: 'hcns.html' }
};

function buildSidebar(activeDept, activeDoc) {
  const nav = [
    { key:'ketoan', icon:'💰', label:'Kế Toán', docs:[
      {id:'xuat-hoadon', label:'Xuất hóa đơn VAT'},
      {id:'doi-soat',    label:'Đối soát công nợ Shopee'},
      {id:'bao-cao-thue',label:'Báo cáo thuế định kỳ'}
    ]},
    { key:'cskh', icon:'💬', label:'CSKH', docs:[
      {id:'xu-ly-khieu-nai', label:'Xử lý khiếu nại'},
      {id:'hoan-tra',        label:'Hoàn trả / đổi hàng'},
      {id:'chat-tu-van',     label:'Kịch bản chat tư vấn'}
    ]},
    { key:'kho', icon:'📦', label:'Kho Vận', docs:[
      {id:'vao-ca',      label:'SOP Vào ca & Check-in'},
      {id:'trong-ca',    label:'SOP Trong ca & Deadline'},
      {id:'nhat-hang',   label:'SOP Nhặt hàng theo batch'},
      {id:'ban-giao-goi',label:'SOP Bàn giao NV Gói'},
      {id:'dong-goi',    label:'SOP Quy cách đóng gói'},
      {id:'quy-dinh',    label:'Quy định nội bộ'},
      {id:'don-sos',     label:'Quy trình đơn SOS'}
    ]},
    { key:'mkt', icon:'📣', label:'Marketing', docs:[
      {id:'chay-quang-cao',  label:'Shopee Ads'},
      {id:'content-san-pham',label:'Content sản phẩm'},
      {id:'flash-sale',      label:'Đăng ký Flash Sale'}
    ]},
    { key:'hcns', icon:'👥', label:'HCNS', docs:[
      {id:'onboarding', label:'Onboarding nhân viên'},
      {id:'cham-cong',  label:'Chấm công / nghỉ phép'},
      {id:'luong-thuong',label:'Tính lương & thưởng'}
    ]}
  ];

  let html = `
    <div class="logo-wrap" onclick="location.href='index.html'">
      <div class="logo-icon">📋</div>
      <div><div class="logo-text">Gia Dụng Plus</div><div class="logo-sub">SOP Nội Bộ</div></div>
    </div>
    <div class="search-wrap">
      <svg class="search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input type="text" placeholder="Tìm tài liệu..." oninput="filterNav(this.value)">
    </div>`;

  for (const sec of nav) {
    const isOpen = sec.key === activeDept;
    html += `<div class="nav-sec${isOpen?' open':''}" data-key="${sec.key}">
      <div class="nav-sec-lbl${isOpen?' active-dept':''}" onclick="toggleSec(this)">
        ${sec.icon} ${sec.label} <span class="nav-toggle">▶</span>
      </div>
      <div class="nav-items">`;
    for (const doc of sec.docs) {
      const isActive = sec.key === activeDept && doc.id === activeDoc;
      html += `<a class="nav-item${isActive?' active':''}" href="${PAGES[sec.key].file}#${doc.id}">${doc.label}</a>`;
    }
    html += `</div></div>`;
  }

  document.getElementById('sidebar').innerHTML = html;
}

function toggleSec(el) { el.closest('.nav-sec').classList.toggle('open'); }

function filterNav(q) {
  q = q.toLowerCase().trim();
  document.querySelectorAll('.nav-item').forEach(item => {
    item.style.display = (!q || item.textContent.toLowerCase().includes(q)) ? 'block' : 'none';
  });
  if (q) document.querySelectorAll('.nav-sec').forEach(s => s.classList.add('open'));
}

// Load doc from hash
function getHash() { return location.hash.replace('#','') || null; }
