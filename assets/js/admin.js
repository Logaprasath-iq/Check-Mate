/**
 * CHECKMATE – Admin Dashboard Modern SaaS Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdminSidebar();
  initAdminTheme();
  initAdminRTL();
  initAdminCharts();
  initTableSearch();
  initAdminInbox();
  initModals();
  initUniversalCRUD();
});

/* ------------------------------------------------------------
   Sidebar Toggle & Responsive Behavior
   ------------------------------------------------------------ */
function initAdminSidebar() {
  const toggleBtn = document.querySelector('.topbar-toggle');
  const sidebar = document.querySelector('.admin-sidebar');
  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 900 && sidebar.classList.contains('open')) {
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    }
  });
}

/* ------------------------------------------------------------
   Theme Switcher Synced
   ------------------------------------------------------------ */
function initAdminTheme() {
  const savedTheme = localStorage.getItem('checkmate-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeToggle = document.querySelector('.admin-theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('checkmate-theme', next);
    });
  }
}

/* ------------------------------------------------------------
   RTL Switcher Synced
   ------------------------------------------------------------ */
function initAdminRTL() {
  const savedDir = localStorage.getItem('checkmate-dir') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);

  const rtlToggle = document.querySelector('.admin-rtl-toggle');
  if (rtlToggle) {
    rtlToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('dir') || 'ltr';
      const next = current === 'ltr' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', next);
      localStorage.setItem('checkmate-dir', next);
    });
  }
}

/* ------------------------------------------------------------
   Chart.js Visualizations
   ------------------------------------------------------------ */
function initAdminCharts() {
  if (typeof Chart === 'undefined') return;

  // Chart Global Defaults
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.font.family = "'Inter', sans-serif";

  // 1. Student Growth Line Chart
  const growthCanvas = document.getElementById('chartStudentGrowth');
  if (growthCanvas) {
    new Chart(growthCanvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Total Active Students',
          data: [1200, 1450, 1900, 2400, 2900, 3400, 3950, 4300, 4650, 4890, 5120, 5400],
          borderColor: '#d4af37',
          backgroundColor: 'rgba(212, 175, 55, 0.08)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#d4af37',
          pointBorderColor: '#080b12',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' } }
        }
      }
    });
  }

  // 2. Revenue Bar Chart
  const revenueCanvas = document.getElementById('chartRevenue');
  if (revenueCanvas) {
    new Chart(revenueCanvas, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
          label: 'Revenue ($)',
          data: [28000, 34000, 42000, 49000, 58000, 64000, 72000, 84500],
          backgroundColor: '#38bdf8',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' } }
        }
      }
    });
  }

  // 3. Program Enrollment Donut Chart
  const enrollCanvas = document.getElementById('chartEnrollment');
  if (enrollCanvas) {
    new Chart(enrollCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Beginner', 'Intermediate', 'Advanced', 'Elite Master'],
        datasets: [{
          data: [35, 30, 22, 13],
          backgroundColor: ['#d4af37', '#38bdf8', '#10b981', '#a855f7'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  // 4. Rating Improvement Distribution
  const ratingCanvas = document.getElementById('chartRatingDistribution');
  if (ratingCanvas) {
    new Chart(ratingCanvas, {
      type: 'bar',
      data: {
        labels: ['+100 pts', '+200 pts', '+300 pts', '+400 pts', '+500+ pts'],
        datasets: [{
          label: 'Students Boosted',
          data: [820, 1420, 1950, 740, 310],
          backgroundColor: '#f59e0b',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' } }
        }
      }
    });
  }
}

/* ------------------------------------------------------------
   Table Search & Filtering
   ------------------------------------------------------------ */
function initTableSearch() {
  const searchInput = document.querySelector('[data-table-search]');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('.admin-table tbody tr');

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(term) ? '' : 'none';
    });
  });
}

/* ------------------------------------------------------------
   Inbox Manager (admin/messages.html)
   ------------------------------------------------------------ */
function initAdminInbox() {
  const msgItems = document.querySelectorAll('.msg-item');
  const viewSubject = document.getElementById('inbox-view-subject');
  const viewSender = document.getElementById('inbox-view-sender');
  const viewBody = document.getElementById('inbox-view-body');

  if (!msgItems.length || !viewSubject) return;

  msgItems.forEach(item => {
    item.addEventListener('click', () => {
      msgItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      item.classList.remove('unread');

      const subject = item.dataset.subject || 'Chess Coaching Inquiry';
      const sender = item.dataset.sender || 'Arjun Mehta';
      const body = item.dataset.body || 'Looking forward to enrolling in the Elite Masterclass...';

      viewSubject.textContent = subject;
      viewSender.textContent = sender;
      viewBody.textContent = body;
    });
  });
}

/* ------------------------------------------------------------
   Generic Modals
   ------------------------------------------------------------ */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-modal-target');
      const targetModal = document.getElementById(targetId);
      if (targetModal) targetModal.style.display = 'flex';
    });
  });

  const closeBtns = document.querySelectorAll('[data-modal-close]');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.admin-modal-backdrop');
      if (modal) modal.style.display = 'none';
    });
  });
}

/* ------------------------------------------------------------
   Universal CRUD Engine (Add, View, Edit, Delete)
   Works across all Admin & Student tables and lists
   ------------------------------------------------------------ */
function initUniversalCRUD() {
  injectCrudModals();

  let activeRow = null;
  let activeCard = null;

  // 1. Modal Close Handlers
  document.querySelectorAll('.crud-modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const backdrop = btn.closest('.admin-modal-backdrop');
      if (backdrop) backdrop.style.display = 'none';
    });
  });

  // Close modals when clicking outside modal card
  document.querySelectorAll('.admin-modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

  // 2. Event Delegation for Action Buttons
  document.addEventListener('click', (e) => {
    // A. Delete Action
    const deleteBtn = e.target.closest('button.action-icon-btn, button.btn-delete, button.btn-action-delete, a.btn-delete');
    const isTrash = deleteBtn && (
      deleteBtn.querySelector('[data-lucide*="trash"]') || 
      deleteBtn.title.toLowerCase().includes('delete') || 
      deleteBtn.classList.contains('btn-delete') ||
      deleteBtn.getAttribute('aria-label') === 'Delete'
    );

    if (isTrash) {
      e.preventDefault();
      e.stopPropagation();

      const row = deleteBtn.closest('tr');
      const card = deleteBtn.closest('.admin-card') || deleteBtn.closest('.msg-item');

      if (row) {
        activeRow = row;
        activeCard = null;
        const tds = Array.from(row.querySelectorAll('td'));
        let title = 'this record';
        if (tds.length > 1 && tds[1].textContent.trim()) {
          title = tds[1].textContent.trim();
        } else if (tds.length > 0) {
          title = tds[0].textContent.trim();
        }

        const msgEl = document.getElementById('checkmate-crud-delete-msg');
        if (msgEl) msgEl.innerHTML = `Are you sure you want to permanently delete <strong>${escapeHtml(title)}</strong>? This operation cannot be undone.`;
        openCrudModal('checkmate-crud-delete-modal');
        return;
      } else if (card) {
        activeCard = card;
        activeRow = null;
        const titleEl = card.querySelector('h2, h3, h4, .msg-sender, div[style*="font-weight: 700"]');
        const title = titleEl ? titleEl.textContent.trim() : 'this item';

        const msgEl = document.getElementById('checkmate-crud-delete-msg');
        if (msgEl) msgEl.innerHTML = `Are you sure you want to permanently delete <strong>${escapeHtml(title)}</strong>?`;
        openCrudModal('checkmate-crud-delete-modal');
        return;
      }
    }

    // B. Edit Action
    const editBtn = e.target.closest('button.action-icon-btn, button.btn-edit, a.btn-edit');
    const isEdit = editBtn && (
      editBtn.querySelector('[data-lucide*="edit"]') || 
      editBtn.title.toLowerCase().includes('edit') || 
      editBtn.classList.contains('btn-edit')
    );

    if (isEdit) {
      e.preventDefault();
      e.stopPropagation();

      const row = editBtn.closest('tr');
      if (row) {
        activeRow = row;
        openEditModalForRow(row);
        return;
      }
    }

    // C. View / Inspect Action
    const viewBtn = e.target.closest('button.action-icon-btn, button.btn-view');
    const isView = viewBtn && (
      viewBtn.querySelector('[data-lucide="eye"]') || 
      viewBtn.title.toLowerCase().includes('view') || 
      viewBtn.title.toLowerCase().includes('profile')
    );

    if (isView) {
      e.preventDefault();
      e.stopPropagation();

      const row = viewBtn.closest('tr');
      if (row) {
        openViewModalForRow(row);
        return;
      }
    }
  }, true);

  // 3. Confirm Delete Handler
  const confirmDeleteBtn = document.getElementById('checkmate-crud-delete-confirm-btn');
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
      if (activeRow) {
        activeRow.style.transition = 'all 0.35s ease';
        activeRow.style.opacity = '0';
        activeRow.style.transform = 'translateX(25px)';
        setTimeout(() => {
          activeRow.remove();
          updatePaginationCount(-1);
          activeRow = null;
        }, 350);
        closeCrudModal('checkmate-crud-delete-modal');
        if (window.showCheckmateToast) {
          window.showCheckmateToast('Record permanently deleted', 'error');
        }
      } else if (activeCard) {
        activeCard.style.transition = 'all 0.35s ease';
        activeCard.style.opacity = '0';
        activeCard.style.transform = 'scale(0.92)';
        setTimeout(() => {
          activeCard.remove();
          activeCard = null;
        }, 350);
        closeCrudModal('checkmate-crud-delete-modal');
        if (window.showCheckmateToast) {
          window.showCheckmateToast('Item deleted successfully', 'error');
        }
      }
    });
  }

  // 4. Edit Form Submission Handler
  const editForm = document.getElementById('checkmate-crud-edit-form');
  if (editForm) {
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!activeRow) return;

      const fields = editForm.querySelectorAll('[data-col-idx]');
      fields.forEach(field => {
        const colIdx = parseInt(field.getAttribute('data-col-idx'), 10);
        const val = field.value.trim();
        const tds = activeRow.querySelectorAll('td');
        if (tds[colIdx]) {
          const td = tds[colIdx];
          const chip = td.querySelector('.status-chip');
          if (chip) {
            chip.textContent = val;
            updateChipStyle(chip, val);
          } else {
            const strong = td.querySelector('strong');
            const span = td.querySelector('span');
            if (strong) {
              strong.textContent = val;
            } else if (span && span.style.fontFamily) {
              span.textContent = val;
            } else {
              td.textContent = val;
            }
          }
        }
      });

      // Highlight row briefly
      activeRow.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
      setTimeout(() => {
        if (activeRow) activeRow.style.backgroundColor = '';
      }, 900);

      closeCrudModal('checkmate-crud-edit-modal');
      if (window.showCheckmateToast) {
        window.showCheckmateToast('Record updated successfully!', 'success');
      }
    });
  }

  // 5. Add Student Modal Interceptor (admin/students.html)
  const addStudentModal = document.getElementById('add-student-modal');
  if (addStudentModal) {
    const form = addStudentModal.querySelector('form');
    if (form) {
      form.removeAttribute('onsubmit');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = form.querySelectorAll('input, select');
        const nameInput = inputs[0] ? inputs[0].value.trim() : 'New Student';
        const emailInput = inputs[1] ? inputs[1].value.trim() : 'student@checkmate.academy';
        const programInput = inputs[2] ? inputs[2].value.trim() : 'Advanced';
        const ratingInput = inputs[3] ? inputs[3].value.trim() : '1500';

        const table = document.querySelector('.admin-table tbody');
        if (table) {
          const newId = `#ST-${Math.floor(1053 + Math.random() * 800)}`;
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><span style="font-family: 'Sora'; font-weight: 700; color: var(--admin-gold);">${newId}</span></td>
            <td style="font-weight: 700;">${escapeHtml(nameInput)}</td>
            <td>${escapeHtml(emailInput)}</td>
            <td><span class="status-chip chip-gold">${escapeHtml(programInput)}</span></td>
            <td style="font-weight: 700; color: #34d399;">${escapeHtml(ratingInput)} (+0)</td>
            <td>FM Arjun Mehta</td>
            <td><span class="status-chip chip-success">Active</span></td>
            <td>Today</td>
            <td>
              <div class="action-btns-group">
                <button class="action-icon-btn" title="View Profile"><i data-lucide="eye" style="width: 14px;"></i></button>
                <button class="action-icon-btn" title="Edit Student"><i data-lucide="edit-3" style="width: 14px;"></i></button>
                <button class="action-icon-btn" title="Delete"><i data-lucide="trash-2" style="width: 14px;"></i></button>
              </div>
            </td>
          `;

          table.prepend(tr);
          tr.style.backgroundColor = 'rgba(212, 175, 55, 0.25)';
          setTimeout(() => { tr.style.backgroundColor = ''; }, 1200);

          if (window.lucide) window.lucide.createIcons();
          updatePaginationCount(1);
        }

        form.reset();
        addStudentModal.style.display = 'none';
        if (window.showCheckmateToast) {
          window.showCheckmateToast(`Student "${nameInput}" successfully enrolled!`, 'success');
        }
      });
    }
  }

  // 6. Generic Topbar Add Buttons for Classes, Tournaments, Coaches, Programs, Blog, Gallery
  initGenericAddButtons();
}

/* ------------------------------------------------------------
   Generic Add Buttons & Modals
   ------------------------------------------------------------ */
function initGenericAddButtons() {
  const addButtons = document.querySelectorAll('.page-title-bar button.btn-admin-gold, .page-title-bar a.btn-admin-gold');
  addButtons.forEach(btn => {
    // If it already targets add-student-modal, leave it to that modal
    if (btn.getAttribute('data-modal-target') === 'add-student-modal') return;

    btn.removeAttribute('onclick');
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // Check if this is gallery page
      if (window.location.pathname.includes('gallery.html')) {
        openCrudModal('checkmate-crud-gallery-modal');
        return;
      }

      // Check if there is an admin table on the page
      const table = document.querySelector('.admin-table');
      if (table) {
        openGenericAddModal(table);
      }
    });
  });

  // Handle Generic Add Form
  const addForm = document.getElementById('checkmate-crud-add-form');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const table = document.querySelector('.admin-table tbody');
      if (!table) return;

      const ths = Array.from(document.querySelectorAll('.admin-table thead th'));
      const fields = addForm.querySelectorAll('[data-add-col-idx]');
      const tr = document.createElement('tr');

      let cellsHtml = '';
      ths.forEach((th, idx) => {
        const header = th.textContent.trim().toLowerCase();
        if (header.includes('action') || header.includes('receipt')) {
          cellsHtml += `
            <td>
              <div class="action-btns-group">
                <button class="action-icon-btn" title="View"><i data-lucide="eye" style="width: 14px;"></i></button>
                <button class="action-icon-btn" title="Edit"><i data-lucide="edit-3" style="width: 14px;"></i></button>
                <button class="action-icon-btn" title="Delete"><i data-lucide="trash-2" style="width: 14px;"></i></button>
              </div>
            </td>
          `;
          return;
        }

        const field = addForm.querySelector(`[data-add-col-idx="${idx}"]`);
        const val = field ? field.value.trim() : '-';

        if (idx === 0) {
          cellsHtml += `<td style="font-weight: 700;">${escapeHtml(val)}</td>`;
        } else if (header.includes('status')) {
          let chipClass = 'chip-success';
          if (['pending', 'draft', 'evaluation'].includes(val.toLowerCase())) chipClass = 'chip-warning';
          if (['failed', 'on leave'].includes(val.toLowerCase())) chipClass = 'chip-danger';
          if (['elite', 'upcoming'].includes(val.toLowerCase())) chipClass = 'chip-gold';
          cellsHtml += `<td><span class="status-chip ${chipClass}">${escapeHtml(val)}</span></td>`;
        } else if (header.includes('program') || header.includes('category') || header.includes('format')) {
          cellsHtml += `<td><span class="status-chip chip-gold">${escapeHtml(val)}</span></td>`;
        } else if (header.includes('rating') || header.includes('prize') || header.includes('amount') || header.includes('students')) {
          cellsHtml += `<td style="font-weight: 700; color: #34d399;">${escapeHtml(val)}</td>`;
        } else {
          cellsHtml += `<td>${escapeHtml(val)}</td>`;
        }
      });

      tr.innerHTML = cellsHtml;
      table.prepend(tr);
      tr.style.backgroundColor = 'rgba(212, 175, 55, 0.25)';
      setTimeout(() => { tr.style.backgroundColor = ''; }, 1200);

      if (window.lucide) window.lucide.createIcons();
      updatePaginationCount(1);
      closeCrudModal('checkmate-crud-add-modal');
      addForm.reset();

      if (window.showCheckmateToast) {
        window.showCheckmateToast('New entry created successfully!', 'success');
      }
    });
  }

  // Handle Gallery Upload Form
  const galleryForm = document.getElementById('checkmate-crud-gallery-form');
  if (galleryForm) {
    galleryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleInput = document.getElementById('gallery-modal-title');
      const catInput = document.getElementById('gallery-modal-cat');
      const title = titleInput ? titleInput.value.trim() : 'Academy Highlight';
      const category = catInput ? catInput.value : 'Academy';

      const grid = document.querySelector('.admin-content > div[style*="grid-template-columns"]');
      if (grid) {
        const card = document.createElement('div');
        card.className = 'admin-card';
        card.style.padding = '1rem';
        card.innerHTML = `
          <img src="../assets/images/gallery-1.jpg" alt="${escapeHtml(title)}" style="width: 100%; aspect-ratio: 16/10; object-fit: cover; border-radius: 8px; margin-bottom: 0.85rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
            <div>
              <div style="font-weight: 700; font-size: 0.95rem;">${escapeHtml(title)}</div>
              <span class="status-chip chip-gold" style="font-size: 0.7rem;">${escapeHtml(category)}</span>
            </div>
            <button class="action-icon-btn" title="Delete"><i data-lucide="trash-2" style="width: 14px;"></i></button>
          </div>
        `;
        grid.prepend(card);
        card.style.backgroundColor = 'rgba(212, 175, 55, 0.25)';
        setTimeout(() => { card.style.backgroundColor = ''; }, 1200);
        if (window.lucide) window.lucide.createIcons();
      }

      galleryForm.reset();
      closeCrudModal('checkmate-crud-gallery-modal');
      if (window.showCheckmateToast) {
        window.showCheckmateToast(`Photo "${title}" published to gallery!`, 'success');
      }
    });
  }
}

/* ------------------------------------------------------------
   Modal Open/Close Helpers & Dynamic Field Builders
   ------------------------------------------------------------ */
function openCrudModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'flex';
    if (window.lucide) window.lucide.createIcons();
  }
}

function closeCrudModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}

function openEditModalForRow(row) {
  const table = row.closest('table');
  if (!table) return;

  const ths = Array.from(table.querySelectorAll('thead th'));
  const tds = Array.from(row.querySelectorAll('td'));
  const fieldsContainer = document.getElementById('checkmate-crud-edit-fields');
  if (!fieldsContainer) return;

  fieldsContainer.innerHTML = '';

  ths.forEach((th, idx) => {
    const label = th.textContent.trim();
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('action') || lowerLabel.includes('receipt') || !label) return;

    const td = tds[idx];
    const currentVal = td ? td.textContent.trim() : '';

    const fieldGroup = document.createElement('div');
    fieldGroup.style.display = 'flex';
    fieldGroup.style.flexDirection = 'column';
    fieldGroup.style.gap = '0.35rem';

    const lbl = document.createElement('label');
    lbl.style.fontSize = '0.78rem';
    lbl.style.fontWeight = '700';
    lbl.style.textTransform = 'uppercase';
    lbl.style.color = 'var(--admin-text-muted, #94a3b8)';
    lbl.textContent = label;
    fieldGroup.appendChild(lbl);

    if (lowerLabel.includes('status')) {
      const select = document.createElement('select');
      select.className = 'newsletter-input';
      select.setAttribute('data-col-idx', idx);
      const statuses = ['Active', 'Pending', 'Evaluation', 'On Leave', 'Upcoming', 'Draft', 'Published', 'Completed', 'Paid', 'Failed'];
      statuses.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = s;
        if (currentVal.toLowerCase().includes(s.toLowerCase())) opt.selected = true;
        select.appendChild(opt);
      });
      fieldGroup.appendChild(select);
    } else if (lowerLabel.includes('program')) {
      const select = document.createElement('select');
      select.className = 'newsletter-input';
      select.setAttribute('data-col-idx', idx);
      const programs = ['Beginner', 'Intermediate', 'Advanced', 'Elite', 'Elite Masterclass'];
      programs.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p;
        opt.textContent = p;
        if (currentVal.toLowerCase().includes(p.toLowerCase())) opt.selected = true;
        select.appendChild(opt);
      });
      fieldGroup.appendChild(select);
    } else {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'newsletter-input';
      input.setAttribute('data-col-idx', idx);
      input.value = currentVal;
      fieldGroup.appendChild(input);
    }

    fieldsContainer.appendChild(fieldGroup);
  });

  openCrudModal('checkmate-crud-edit-modal');
}

function openViewModalForRow(row) {
  const table = row.closest('table');
  if (!table) return;

  const ths = Array.from(table.querySelectorAll('thead th'));
  const tds = Array.from(row.querySelectorAll('td'));
  const viewContainer = document.getElementById('checkmate-crud-view-content');
  if (!viewContainer) return;

  viewContainer.innerHTML = '';

  ths.forEach((th, idx) => {
    const label = th.textContent.trim();
    if (label.toLowerCase().includes('action') || label.toLowerCase().includes('receipt') || !label) return;

    const td = tds[idx];
    const val = td ? td.textContent.trim() : '-';

    const rowEl = document.createElement('div');
    rowEl.style.display = 'flex';
    rowEl.style.justifyContent = 'space-between';
    rowEl.style.alignItems = 'center';
    rowEl.style.padding = '0.65rem 0';
    rowEl.style.borderBottom = '1px solid var(--admin-card-border, rgba(255,255,255,0.06))';

    rowEl.innerHTML = `
      <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--admin-text-muted, #94a3b8);">${escapeHtml(label)}</span>
      <span style="font-size: 0.9rem; font-weight: 600; color: var(--admin-text, #f8fafc);">${escapeHtml(val)}</span>
    `;
    viewContainer.appendChild(rowEl);
  });

  openCrudModal('checkmate-crud-view-modal');
}

function openGenericAddModal(table) {
  const ths = Array.from(table.querySelectorAll('thead th'));
  const fieldsContainer = document.getElementById('checkmate-crud-add-fields');
  const titleEl = document.getElementById('checkmate-crud-add-title');
  if (!fieldsContainer) return;

  fieldsContainer.innerHTML = '';

  const pageHeadline = document.querySelector('.page-headline');
  if (titleEl && pageHeadline) {
    titleEl.textContent = `ADD NEW: ${pageHeadline.textContent.trim()}`;
  }

  ths.forEach((th, idx) => {
    const label = th.textContent.trim();
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('action') || lowerLabel.includes('receipt') || !label) return;

    const fieldGroup = document.createElement('div');
    fieldGroup.style.display = 'flex';
    fieldGroup.style.flexDirection = 'column';
    fieldGroup.style.gap = '0.35rem';

    const lbl = document.createElement('label');
    lbl.style.fontSize = '0.78rem';
    lbl.style.fontWeight = '700';
    lbl.style.textTransform = 'uppercase';
    lbl.style.color = 'var(--admin-text-muted, #94a3b8)';
    lbl.textContent = label;
    fieldGroup.appendChild(lbl);

    if (lowerLabel.includes('status')) {
      const select = document.createElement('select');
      select.className = 'newsletter-input';
      select.setAttribute('data-add-col-idx', idx);
      const statuses = ['Active', 'Pending', 'Upcoming', 'Draft', 'Published'];
      statuses.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = s;
        select.appendChild(opt);
      });
      fieldGroup.appendChild(select);
    } else if (lowerLabel.includes('program')) {
      const select = document.createElement('select');
      select.className = 'newsletter-input';
      select.setAttribute('data-add-col-idx', idx);
      const programs = ['Beginner', 'Intermediate', 'Advanced', 'Elite'];
      programs.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p;
        opt.textContent = p;
        select.appendChild(opt);
      });
      fieldGroup.appendChild(select);
    } else {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'newsletter-input';
      input.setAttribute('data-add-col-idx', idx);
      input.required = true;
      input.placeholder = `Enter ${label}...`;
      fieldGroup.appendChild(input);
    }

    fieldsContainer.appendChild(fieldGroup);
  });

  openCrudModal('checkmate-crud-add-modal');
}

function updateChipStyle(chip, val) {
  const lower = val.toLowerCase();
  chip.className = 'status-chip';
  if (['active', 'published', 'paid', 'completed'].includes(lower)) {
    chip.classList.add('chip-success');
  } else if (['pending', 'draft', 'evaluation'].includes(lower)) {
    chip.classList.add('chip-warning');
  } else if (['failed', 'on leave', 'danger'].includes(lower)) {
    chip.classList.add('chip-danger');
  } else {
    chip.classList.add('chip-gold');
  }
}

function updatePaginationCount(delta) {
  const paginationText = document.querySelector('.admin-pagination > div:first-child');
  if (paginationText) {
    const text = paginationText.textContent;
    const match = text.match(/Showing\s+(\d+)\s+to\s+(\d+)\s+of\s+([\d,]+)/i);
    if (match) {
      const currentShowing = parseInt(match[2], 10) + delta;
      let total = parseInt(match[3].replace(/,/g, ''), 10) + delta;
      if (currentShowing >= 0 && total >= 0) {
        paginationText.textContent = `Showing 1 to ${Math.max(1, currentShowing)} of ${total.toLocaleString()} records`;
      }
    }
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function injectCrudModals() {
  if (document.getElementById('checkmate-crud-edit-modal')) return;

  const container = document.createElement('div');
  container.id = 'checkmate-crud-modals-container';
  container.innerHTML = `
    <!-- Universal Edit Modal -->
    <div id="checkmate-crud-edit-modal" class="admin-modal-backdrop" style="position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 99999; display: none; align-items: center; justify-content: center; padding: 1.5rem;">
      <div style="background: var(--admin-card-bg, #0f172a); border: 1px solid var(--admin-gold, #d4af37); border-radius: 12px; max-width: 520px; width: 100%; max-height: 88vh; overflow-y: auto; padding: 2rem; box-shadow: 0 25px 60px rgba(0,0,0,0.6);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--admin-card-border, rgba(255,255,255,0.1)); padding-bottom: 0.75rem;">
          <h3 style="font-family: 'Sora', sans-serif; font-size: 1.25rem; font-weight: 800; color: var(--admin-text, #fff); margin: 0;">EDIT RECORD</h3>
          <button type="button" class="crud-modal-close" style="background: none; border: none; color: var(--admin-text-muted, #94a3b8); font-size: 1.75rem; cursor: pointer; line-height: 1;">&times;</button>
        </div>
        <form id="checkmate-crud-edit-form" style="display: flex; flex-direction: column; gap: 1rem;">
          <div id="checkmate-crud-edit-fields" style="display: flex; flex-direction: column; gap: 1rem;"></div>
          <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
            <button type="submit" class="btn-admin-gold" style="flex: 1; justify-content: center; padding: 0.75rem;">SAVE CHANGES</button>
            <button type="button" class="crud-modal-close action-icon-btn" style="width: auto; padding: 0.75rem 1.25rem;">CANCEL</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Universal Delete Modal -->
    <div id="checkmate-crud-delete-modal" class="admin-modal-backdrop" style="position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 99999; display: none; align-items: center; justify-content: center; padding: 1.5rem;">
      <div style="background: var(--admin-card-bg, #0f172a); border: 1px solid rgba(239,68,68,0.6); border-radius: 12px; max-width: 440px; width: 100%; padding: 2rem; box-shadow: 0 25px 60px rgba(0,0,0,0.6);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(239,68,68,0.15); color: #ef4444; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <i data-lucide="alert-triangle" style="width: 22px;"></i>
          </div>
          <div>
            <h3 style="font-family: 'Sora', sans-serif; font-size: 1.15rem; font-weight: 800; color: #ef4444; margin: 0;">CONFIRM DELETION</h3>
            <span style="font-size: 0.78rem; color: var(--admin-text-muted, #94a3b8);">This action is permanent</span>
          </div>
        </div>
        <p id="checkmate-crud-delete-msg" style="color: var(--admin-text, #f8fafc); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
          Are you sure you want to permanently delete this record?
        </p>
        <div style="display: flex; gap: 0.75rem;">
          <button type="button" id="checkmate-crud-delete-confirm-btn" style="flex: 1; justify-content: center; padding: 0.75rem; background: #ef4444; color: #fff; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
            <i data-lucide="trash-2" style="width: 16px;"></i> YES, DELETE
          </button>
          <button type="button" class="crud-modal-close action-icon-btn" style="width: auto; padding: 0.75rem 1.25rem;">CANCEL</button>
        </div>
      </div>
    </div>

    <!-- Universal View Modal -->
    <div id="checkmate-crud-view-modal" class="admin-modal-backdrop" style="position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 99999; display: none; align-items: center; justify-content: center; padding: 1.5rem;">
      <div style="background: var(--admin-card-bg, #0f172a); border: 1px solid var(--admin-gold, #d4af37); border-radius: 12px; max-width: 520px; width: 100%; max-height: 88vh; overflow-y: auto; padding: 2rem; box-shadow: 0 25px 60px rgba(0,0,0,0.6);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--admin-card-border, rgba(255,255,255,0.1)); padding-bottom: 0.75rem;">
          <h3 style="font-family: 'Sora', sans-serif; font-size: 1.25rem; font-weight: 800; color: var(--admin-text, #fff); margin: 0;">RECORD DETAILS</h3>
          <button type="button" class="crud-modal-close" style="background: none; border: none; color: var(--admin-text-muted, #94a3b8); font-size: 1.75rem; cursor: pointer; line-height: 1;">&times;</button>
        </div>
        <div id="checkmate-crud-view-content" style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.5rem;"></div>
        <div style="display: flex; justify-content: flex-end;">
          <button type="button" class="crud-modal-close btn-admin-gold" style="padding: 0.65rem 1.5rem;">CLOSE</button>
        </div>
      </div>
    </div>

    <!-- Universal Add Modal -->
    <div id="checkmate-crud-add-modal" class="admin-modal-backdrop" style="position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 99999; display: none; align-items: center; justify-content: center; padding: 1.5rem;">
      <div style="background: var(--admin-card-bg, #0f172a); border: 1px solid var(--admin-gold, #d4af37); border-radius: 12px; max-width: 520px; width: 100%; max-height: 88vh; overflow-y: auto; padding: 2rem; box-shadow: 0 25px 60px rgba(0,0,0,0.6);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--admin-card-border, rgba(255,255,255,0.1)); padding-bottom: 0.75rem;">
          <h3 id="checkmate-crud-add-title" style="font-family: 'Sora', sans-serif; font-size: 1.25rem; font-weight: 800; color: var(--admin-text, #fff); margin: 0;">CREATE NEW RECORD</h3>
          <button type="button" class="crud-modal-close" style="background: none; border: none; color: var(--admin-text-muted, #94a3b8); font-size: 1.75rem; cursor: pointer; line-height: 1;">&times;</button>
        </div>
        <form id="checkmate-crud-add-form" style="display: flex; flex-direction: column; gap: 1rem;">
          <div id="checkmate-crud-add-fields" style="display: flex; flex-direction: column; gap: 1rem;"></div>
          <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
            <button type="submit" class="btn-admin-gold" style="flex: 1; justify-content: center; padding: 0.75rem;">SAVE RECORD</button>
            <button type="button" class="crud-modal-close action-icon-btn" style="width: auto; padding: 0.75rem 1.25rem;">CANCEL</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Gallery Upload Modal -->
    <div id="checkmate-crud-gallery-modal" class="admin-modal-backdrop" style="position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 99999; display: none; align-items: center; justify-content: center; padding: 1.5rem;">
      <div style="background: var(--admin-card-bg, #0f172a); border: 1px solid var(--admin-gold, #d4af37); border-radius: 12px; max-width: 480px; width: 100%; padding: 2rem; box-shadow: 0 25px 60px rgba(0,0,0,0.6);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--admin-card-border, rgba(255,255,255,0.1)); padding-bottom: 0.75rem;">
          <h3 style="font-family: 'Sora', sans-serif; font-size: 1.25rem; font-weight: 800; color: var(--admin-text, #fff); margin: 0;">UPLOAD NEW PHOTO</h3>
          <button type="button" class="crud-modal-close" style="background: none; border: none; color: var(--admin-text-muted, #94a3b8); font-size: 1.75rem; cursor: pointer; line-height: 1;">&times;</button>
        </div>
        <form id="checkmate-crud-gallery-form" style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--admin-text-muted, #94a3b8); margin-bottom: 0.35rem;">Photo Title</label>
            <input type="text" id="gallery-modal-title" class="newsletter-input" placeholder="e.g. Masterclass Analysis Session" required>
          </div>
          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--admin-text-muted, #94a3b8); margin-bottom: 0.35rem;">Category</label>
            <select id="gallery-modal-cat" class="newsletter-input">
              <option value="Academy">Academy</option>
              <option value="Tournaments">Tournaments</option>
              <option value="Training">Training</option>
            </select>
          </div>
          <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
            <button type="submit" class="btn-admin-gold" style="flex: 1; justify-content: center; padding: 0.75rem;">PUBLISH PHOTO</button>
            <button type="button" class="crud-modal-close action-icon-btn" style="width: auto; padding: 0.75rem 1.25rem;">CANCEL</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(container);
  if (window.lucide) window.lucide.createIcons();
}
