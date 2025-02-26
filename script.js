// 生成随机验证码
function generateCaptcha() {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < 4; i++) {
        captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    return captcha;
}

// 在画布上绘制验证码
function drawCaptcha(captcha) {
    const canvas = document.getElementById('captchaCanvas');
    if (!canvas) {
        console.error('找不到验证码画布元素');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // 设置画布大小
    canvas.width = 100;
    canvas.height = 40;

    // 清除之前的内容
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 填充白色背景
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制干扰线
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.strokeStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
        ctx.stroke();
    }

    // 绘制验证码文字
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i < captcha.length; i++) {
        const x = 20 + i * 20;
        const y = canvas.height / 2;
        ctx.fillStyle = `rgb(${Math.random() * 150},${Math.random() * 150},${Math.random() * 150})`;
        ctx.fillText(captcha[i], x, y);
    }
}

// 当前验证码
let currentCaptcha = '';

// 刷新验证码
function refreshCaptcha() {
    currentCaptcha = generateCaptcha();
    console.log('生成新验证码:', currentCaptcha);
    drawCaptcha(currentCaptcha);
}

// 处理登录
function handleLogin(event) {
    event.preventDefault();
    
    const idNumber = document.getElementById('idNumber').value;
    const password = document.getElementById('password').value;
    const captcha = document.getElementById('captcha').value;
    const errorMessage = document.getElementById('errorMessage');
    const loginBtn = document.querySelector('.login-btn');

    // 验证身份证号/准考证号
    if (!/^\d{15,18}$/.test(idNumber)) {
        errorMessage.textContent = '请输入有效的证件号码';
        return false;
    }

    // 验证密码
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@]{8,}$/.test(password)) {
        errorMessage.textContent = '密码必须包含至少8位数字和字母';
        return false;
    }

    // 验证验证码
    if (captcha.toLowerCase() !== currentCaptcha.toLowerCase()) {
        errorMessage.textContent = '验证码错误';
        refreshCaptcha();
        document.getElementById('captcha').value = '';
        return false;
    }

    // 显示加载状态
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 正在登录...';
    errorMessage.textContent = '';

    // 模拟登录请求延迟
    setTimeout(() => {
        // 验证用户名和密码
        if (idNumber === '652922200306260531' && password === 'Qd852456@') {
            showScoreModal({
                name: '焦**',
                idNumber: '652922********0531',
                school: '陕西科技大学',
                reportId: '242261043001216',
                scores: {
                    total: 433,
                    listening: 142,
                    reading: 159,
                    writing: 132,
                    speaking: 'B',
                    examId: '610431242211907'
                }
            });
        } else {
            errorMessage.textContent = '证件号码或密码错误，请重新输入';
            refreshCaptcha();
            document.getElementById('captcha').value = '';
        }

        // 恢复按钮状态
        loginBtn.disabled = false;
        loginBtn.innerHTML = '登录';
    }, 2000);

    return false;
}

// 显示成绩查询模态框
function showScoreModal(data) {
    const modal = document.createElement('div');
    modal.className = 'score-modal';
    modal.innerHTML = `
        <div class="score-content">
            <h2>全国大学英语六级考试(CET6)成绩详情</h2>
            
            <div class="personal-info">
                <div class="info-wrapper">
                    <div class="info-main">
                        <div class="info-item">
                            <span class="label">姓名：</span>
                            <span class="value">${data.name}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">证件号码：</span>
                            <span class="value">${data.idNumber}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">学校名称：</span>
                            <span class="value">${data.school}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">成绩报告单编号：</span>
                            <span class="value">${data.reportId}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="score-tables">
                <div class="score-section">
                    <h3>笔试成绩</h3>
                    <table>
                        <tr>
                            <th>准考证号</th>
                            <td colspan="4">${data.scores.examId}</td>
                        </tr>
                        <tr>
                            <th>总分</th>
                            <th>听力</th>
                            <th>阅读</th>
                            <th>写作与翻译</th>
                        </tr>
                        <tr>
                            <td style="color: #2ecc71; font-weight: bold;">${data.scores.total}</td>
                            <td>${data.scores.listening}</td>
                            <td>${data.scores.reading}</td>
                            <td>${data.scores.writing}</td>
                        </tr>
                    </table>
                </div>

                <div class="score-section">
                    <h3>口试成绩</h3>
                    <table>
                        <tr>
                            <th>准考证号</th>
                            <th>成绩</th>
                        </tr>
                        <tr>
                            <td>--</td>
                            <td>--</td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="notice-text">
                您在报名期间已选择需要纸质成绩报告单，2月26日6时至2月28日17时可再次登录报名网站（<a href="http://cet-bm.neea.edu.cn" target="_blank">cet-bm.neea.edu.cn</a>）进行修改。
            </div>

            <div class="modal-buttons">
                <button class="close-btn" onclick="closeScoreModal()">
                    <i class="fas fa-arrow-left"></i> 返回
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// 关闭成绩查询模态框
function closeScoreModal() {
    const modal = document.querySelector('.score-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.remove();
    }, 300);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成，初始化验证码');
    refreshCaptcha();
    
    // 添加点击刷新按钮的事件监听
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            console.log('点击刷新验证码');
            refreshCaptcha();
        });
    }
}); 