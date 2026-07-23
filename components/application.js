"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  ["/", "grid_view", "Trang chủ"],
  ["/kho-tri-thuc/tong-hop-chien-dich", "menu_book", "Kho tri thức"],
  ["/bao-cao-aar/gui", "description", "Gửi báo cáo AAR"],
  ["/duyet-bai", "verified_user", "Duyệt bài"],
  ["/thong-ke", "bar_chart", "Thống kê (KPI)"],
];

const screenInfo = {
  "/dieu-hanh": ["Trung tâm điều hành", "Theo dõi nhiệm vụ và trạng thái đội bay theo thời gian thực."],
  "/kho-tri-thuc/tong-hop-chien-dich": ["Tổng hợp tri thức chiến dịch", "Các bài học, SOP và dữ liệu đã được xác thực từ nhiệm vụ UAV."],
  "/kho-tri-thuc/ho-so-khong-gian": ["Hồ sơ không gian thực địa", "Tổng hợp điều kiện địa hình, vùng bay và dữ liệu cảm biến."],
  "/kho-tri-thuc/lich-su-tien-hoa": ["Lịch sử tiến hóa tri thức", "Dòng thời gian cập nhật và những thay đổi quan trọng của tri thức."],
  "/bao-cao-aar": ["Phân tích báo cáo AAR", "Phân loại sự cố và rút ra bài học cho các nhiệm vụ tiếp theo."],
  "/duyet-bai": ["Duyệt báo cáo AAR", "Đánh giá nội dung trước khi công bố vào kho tri thức."],
  "/bao-cao-aar/tong-ket": ["Tổng kết chiến dịch", "Chỉ số hiệu quả và các đề xuất cải tiến sau chiến dịch."],
  "/phan-phoi-sop": ["Phân phối SOP", "Cấu hình đối tượng nhận và yêu cầu tuân thủ tài liệu chuẩn."],
  "/thong-ke": ["Thống kê & KPI", "Báo cáo hiệu quả vận hành và mức độ khai thác tri thức."],
};

function Icon({ children }) {
  return <span className="material-symbols-outlined" aria-hidden="true">{children}</span>;
}

function Profile({ onLogout }) {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(false);

  return <>
    <button className="avatar-button" onClick={() => setOpen(!open)} aria-label="Mở menu tài khoản">
      <span className="avatar">CH</span>
    </button>
    {open && <div className="profile-popover">
      <div className="profile-summary"><strong>Nguyễn Văn Chỉ huy</strong><span>Chỉ huy vận hành</span></div>
      <button onClick={() => { setOpen(false); setDetail(true); }}><Icon>person</Icon>Xem chi tiết hồ sơ</button>
      <button className="danger" onClick={onLogout}><Icon>logout</Icon>Đăng xuất vai trò này</button>
    </div>}
    {detail && <div className="modal-backdrop" onMouseDown={() => setDetail(false)}>
      <section className="profile-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header"><div><h2>Chi tiết hồ sơ</h2><p>Thông tin tài khoản đang sử dụng</p></div><button onClick={() => setDetail(false)} aria-label="Đóng"><Icon>close</Icon></button></div>
        <div className="profile-identity"><span className="avatar large">CH</span><div><strong>Nguyễn Văn Chỉ huy</strong><p>Chỉ huy vận hành</p></div></div>
        <dl className="profile-data"><div><dt>Mã cán bộ</dt><dd>UAV-CH-001</dd></div><div><dt>Đơn vị</dt><dd>Trung tâm điều hành UAV</dd></div><div><dt>Vai trò đang hoạt động</dt><dd>Chỉ huy vận hành</dd></div><div><dt>Email công vụ</dt><dd>chihuy@uav.gov.vn</dd></div></dl>
      </section>
    </div>}
  </>;
}

function Sidebar({ pathname, go }) {
  return <aside className="sidebar">
    <div className="brand"><Icon>shield_person</Icon><div><b>UAV Knowledge</b><small>VIGILANCE &amp; RESPONSE</small></div></div>
    <button className="create-button" onClick={() => go("/bao-cao-aar/gui")}>KHỞI TẠO NHIỆM VỤ</button>
    <nav>{navItems.map(([href, icon, label]) => <button className={pathname === href ? "active" : ""} key={href} onClick={() => go(href)}><Icon>{icon}</Icon>{label}</button>)}</nav>
    <div className="sidebar-footer"><button><Icon>settings</Icon>Cài đặt</button><button><Icon>help</Icon>Hỗ trợ</button></div>
  </aside>;
}

function Header({ onLogout }) {
  return <header className="app-header"><strong>UAV Knowledge System</strong><div className="search"><Icon>search</Icon><input aria-label="Tìm kiếm" placeholder="Tìm kiếm tài liệu, SOP..." /></div><div className="header-actions"><button aria-label="Thông báo"><Icon>notifications</Icon></button><button className="settings" aria-label="Cài đặt"><Icon>settings</Icon></button><Profile onLogout={onLogout} /></div></header>;
}

function Card({ icon, title, text, children }) {
  return <article className="card"><div className="card-icon"><Icon>{icon}</Icon></div><h3>{title}</h3>{text && <p>{text}</p>}{children}</article>;
}

function Dashboard({ go }) {
  return <><section className="welcome"><h1>Chào mừng, Chỉ huy</h1><p>Hệ thống giám sát và quản lý tri thức UAV đang hoạt động ổn định.</p></section>
    <section className="quick-grid"><button onClick={() => go("/bao-cao-aar/gui")}><Card icon="note_add" title="Báo cáo AAR mới" text="Ghi log nhiệm vụ ngay lập tức" /></button><button onClick={() => go("/kho-tri-thuc/tong-hop-chien-dich")}><Card icon="menu_book" title="Tra cứu tri thức" text="Tìm kiếm giải pháp và quy trình" /></button><button onClick={() => go("/dieu-hanh")}><Card icon="emergency" title="Xử lý sự cố" text="Tra cứu quy trình xử lý sự cố nhanh" /></button></section>
    <section className="dashboard-columns"><article className="panel"><div className="panel-title"><h2>Hoạt động gần đây</h2><button className="link-button">Xem tất cả</button></div><Activity icon="flight_takeoff" title="Drone-01: Tuần tra Khu vực A" meta="Hoàn thành lúc 09:45 · 2 giờ trước" /><Activity icon="description" title="Báo cáo AAR #AAR-084 đã được gửi" meta="Đang chờ phê duyệt · 4 giờ trước" /><Activity icon="verified" title="SOP bay trong điều kiện gió mạnh đã cập nhật" meta="Kho tri thức · Hôm qua" /></article>
      <article className="panel"><div className="panel-title"><h2>Trạng thái hệ thống</h2><span className="status-good">Ổn định</span></div><Status label="Đội bay sẵn sàng" value="8 / 10" /><Status label="Báo cáo chờ duyệt" value="12" /><Status label="SOP cần rà soát" value="3" /></article></section>
  </>;
}

function Activity({ icon, title, meta }) { return <div className="activity"><span className="activity-icon"><Icon>{icon}</Icon></span><div><strong>{title}</strong><p>{meta}</p></div></div>; }
function Status({ label, value }) { return <div className="status-row"><span>{label}</span><strong>{value}</strong></div>; }

const knowledgeItems = [
  ["SOP bay UAV trong điều kiện gió mạnh cấp 5", "Quy trình vận hành", "Đã xác thực"],
  ["Phát hiện điểm nóng bằng camera nhiệt", "Bài học chiến dịch", "Được quan tâm"],
  ["Checklist kiểm tra pin và động cơ trước chuyến bay", "Tài liệu chuẩn", "Cập nhật hôm nay"],
];

function KnowledgeHome({ terrain, history }) {
  const [showArticle, setShowArticle] = useState(false);
  const title = terrain ? "Hồ sơ không gian thực địa" : history ? "Lịch sử tiến hóa tri thức" : "Tổng hợp tri thức chiến dịch";
  const subtitle = terrain ? "Bản đồ thông tin vùng bay và điều kiện hiện trường." : history ? "Các phiên bản tri thức được ghi nhận theo thời gian." : "Các bài học, SOP và dữ liệu đã được xác thực từ nhiệm vụ UAV.";
  return <><section className="page-title"><span>Kho tri thức</span><h1>{title}</h1><p>{subtitle}</p></section>{terrain ? <Terrain /> : history ? <Timeline /> : showArticle ? <SopWindArticle onBack={() => setShowArticle(false)} /> : <KnowledgeList onOpenArticle={() => setShowArticle(true)} />}</>;
}

function KnowledgeList({ onOpenArticle }) { return <section className="content-grid"><article className="panel wide"><div className="panel-title"><h2>Tài liệu nổi bật</h2><button className="primary-button">+ Tạo tri thức</button></div><div className="filter-row"><button className="selected">Tất cả</button><button>SOP</button><button>Bài học</button><button>Dữ liệu cảm biến</button></div>{knowledgeItems.map(([name, type, tag], index) => <div className={`knowledge-item ${index === 0 ? "article-row" : ""}`} key={name} onClick={index === 0 ? onOpenArticle : undefined} onKeyDown={index === 0 ? (event) => { if (event.key === "Enter" || event.key === " ") onOpenArticle(); } : undefined} role={index === 0 ? "button" : undefined} tabIndex={index === 0 ? 0 : undefined}><span className="file-icon"><Icon>description</Icon></span><div><h3>{name}</h3><p>{type} · Cập nhật 23/07/2026</p></div><span className="tag">{tag}</span><button aria-label="Xem chi tiết"><Icon>more_vert</Icon></button></div>)}</article><article className="panel"><h2>Chủ đề được truy cập nhiều</h2><div className="topic-list"><span>Vận hành bay đêm <b>124</b></span><span>Quy trình khẩn cấp <b>98</b></span><span>Camera nhiệt <b>76</b></span><span>Địa hình rừng núi <b>64</b></span></div></article></section>; }

function SopWindArticle({ onBack }) { return <article className="article-detail panel"><button className="article-back" onClick={onBack}><Icon>arrow_back</Icon>Quay lại tài liệu nổi bật</button><header className="article-header"><span className="tag">SOP đã xác thực</span><h2>SOP bay UAV trong điều kiện gió mạnh cấp 5</h2><p>Hướng dẫn ra quyết định và kiểm soát rủi ro cho nhiệm vụ UAV khi gió cấp 5. Nội dung là tài liệu tham khảo vận hành; giới hạn trong sổ tay của từng tàu bay và quy định địa phương luôn được ưu tiên áp dụng.</p><div className="article-meta"><span><Icon>update</Icon>Cập nhật 23/07/2026</span><span><Icon>verified</Icon>Đã rà soát nguồn</span></div></header><div className="article-alert"><Icon>warning</Icon><div><strong>Điểm quyết định an toàn</strong><p>Thang Beaufort cấp 5 tương ứng gió 17–21 kt (xấp xỉ 31–39 km/h). Đây không phải ngưỡng tự động được phép cất cánh: chỉ triển khai khi điều kiện nằm trong giới hạn gió và gió giật do nhà sản xuất tàu bay quy định, đồng thời đánh giá rủi ro nhiệm vụ đã được phê duyệt.</p></div></div><section className="article-section"><h3>1. Chuẩn bị trước chuyến bay</h3><ul className="article-checklist"><li>Kiểm tra dự báo gió duy trì, gió giật, hướng gió, mưa và tầm nhìn tại khu vực bay; đánh giá cả điều kiện ở độ cao dự kiến.</li><li>Đối chiếu giới hạn gió/gió giật, pin, tải trọng và chế độ Return-to-Home trong sổ tay đúng mẫu UAV sẽ sử dụng.</li><li>Xác nhận khu vực cất/hạ cánh an toàn, phương án hạ cánh dự phòng, liên lạc giữa phi công và quan sát viên.</li><li>Ghi nhận quyết định go/no-go cùng dữ liệu thời tiết vào nhật ký nhiệm vụ.</li></ul></section><section className="article-section"><h3>2. Điều kiện dừng hoặc hoãn nhiệm vụ</h3><p>Hoãn cất cánh hoặc kết thúc nhiệm vụ khi gió hoặc gió giật vượt giới hạn đã được phê duyệt, khi không duy trì được quan sát trực tiếp UAV, hoặc khi mưa/sương mù làm giảm khả năng điều khiển và đánh giá môi trường. FAA cũng nhấn mạnh gió giật có thể vượt khả năng tốc độ thấp của UAV và làm việc kiểm soát hoặc thu hồi tàu bay trở nên khó khăn.</p></section><section className="article-section"><h3>3. Kiểm soát trong khi bay</h3><ul className="article-checklist"><li>Duy trì quan sát trực tiếp, theo dõi liên tục hướng gió, tốc độ mặt đất, mức pin và cảnh báo của tàu bay.</li><li>Giảm phạm vi, độ cao và thời lượng nhiệm vụ theo đánh giá của chỉ huy bay; dành đủ năng lượng cho hành trình quay về và hạ cánh.</li><li>Không tiếp tục theo kế hoạch cũ khi điều kiện thay đổi; ưu tiên hạ cánh an toàn tại vị trí đã phê duyệt.</li><li>Nếu mất ổn định hoặc cảnh báo điều khiển, thực hiện quy trình khẩn cấp của nhà sản xuất và thông báo ngay cho chỉ huy nhiệm vụ.</li></ul></section><section className="article-section"><h3>4. Đóng nhiệm vụ và báo cáo</h3><p>Ghi lại gió duy trì/gió giật quan sát được, giới hạn đã áp dụng, quyết định thay đổi nhiệm vụ, cảnh báo và hành động khắc phục. Dữ liệu này dùng để cập nhật đánh giá rủi ro và SOP, không thay thế báo cáo sự cố theo quy định nội bộ.</p></section><footer className="article-sources"><h3>Nguồn tham khảo uy tín</h3><a href="https://www.weather.gov/boi/beaufort" target="_blank" rel="noreferrer"><Icon>open_in_new</Icon>NOAA National Weather Service — Beaufort Wind Scale (cấp 5: 17–21 kt)</a><a href="https://www.faa.gov/sites/faa.gov/files/Safety_Briefing_MarApr2024.pdf" target="_blank" rel="noreferrer"><Icon>open_in_new</Icon>FAA Safety Briefing — Drone safety roundup: rủi ro gió, gió giật và giới hạn điều khiển</a><a href="https://www.faa.gov/newsroom/small-unmanned-aircraft-systems-uas-regulations-part-107" target="_blank" rel="noreferrer"><Icon>open_in_new</Icon>FAA — Small UAS Regulations (Part 107): quan sát trực tiếp và yêu cầu thời tiết</a></footer></article>; }

function Terrain() { return <section className="terrain-layout"><article className="map-panel"><div className="map-toolbar"><strong>Bản đồ vùng bay</strong><button><Icon>layers</Icon>Lớp dữ liệu</button></div><div className="map-visual"><div className="map-river" /><i className="pin one"><Icon>location_on</Icon></i><i className="pin two"><Icon>location_on</Icon></i><i className="pin three"><Icon>location_on</Icon></i><span>VÙNG TUẦN TRA A</span></div></article><article className="panel"><h2>Thông tin khu vực</h2><Status label="Độ cao trung bình" value="482 m" /><Status label="Tốc độ gió" value="12 km/h" /><Status label="Nguy cơ cháy" value="Trung bình" /><Status label="Tín hiệu GPS" value="Tốt" /></article></section>; }

function Timeline() { const items = ["Cập nhật SOP xử lý mất tín hiệu GPS", "Bổ sung bài học từ nhiệm vụ Khe Rơi", "Phê duyệt bộ checklist bảo dưỡng pin", "Khởi tạo thư viện tri thức chiến dịch hè 2026"]; return <section className="panel timeline">{items.map((item, index) => <div className="timeline-item" key={item}><span>{index + 1}</span><div><strong>{item}</strong><p>{23 - index} tháng 07, 2026 · Chỉ huy vận hành</p><small>Thay đổi đã được ghi nhận và có thể truy vết phiên bản.</small></div></div>)}</section>; }

function CommandCenter() { return <><section className="page-title"><span>Vận hành trực tiếp</span><h1>Trung tâm điều hành</h1><p>Theo dõi nhiệm vụ và trạng thái đội bay theo thời gian thực.</p></section><section className="command-layout"><article className="map-panel"><div className="map-toolbar"><strong>Bản đồ nhiệm vụ</strong><span className="live"><i />TRỰC TUYẾN</span></div><div className="map-visual command-map"><i className="drone"><Icon>flight</Icon></i><i className="pin one"><Icon>location_on</Icon></i><i className="pin three"><Icon>location_on</Icon></i></div></article><article className="panel"><h2>Đội bay</h2><Flight name="Drone-01" task="Tuần tra Khu vực A" state="Đang bay" /><Flight name="Drone-02" task="Sẵn sàng cất cánh" state="Sẵn sàng" /><Flight name="Drone-03" task="Bảo dưỡng định kỳ" state="Tạm dừng" /></article></section></>; }
function Flight({ name, task, state }) { return <div className="flight"><span className="file-icon"><Icon>flight</Icon></span><div><strong>{name}</strong><p>{task}</p></div><span className={state === "Đang bay" ? "tag orange" : "tag"}>{state}</span></div>; }

function AarSubmit() { const [sent, setSent] = useState(false); return <><section className="page-title"><span>After Action Report</span><h1>Gửi báo cáo AAR mới</h1><p>Ghi nhận sự kiện, bài học kinh nghiệm và đề xuất cải tiến sau nhiệm vụ UAV.</p></section><form className="form-panel" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><div className="form-grid"><label>Mã nhiệm vụ<input defaultValue="MIS-2026-0723-A" /></label><label>Thời gian xảy ra<input type="datetime-local" defaultValue="2026-07-23T09:30" /></label></div><label>Loại sự kiện<select defaultValue=""><option value="" disabled>Chọn loại sự kiện</option><option>Mất tín hiệu</option><option>Sự cố kỹ thuật</option><option>Phát hiện mới</option></select></label><label>Mô tả sự kiện<textarea placeholder="Mô tả rõ diễn biến, nguyên nhân và tác động..." /></label><label>Bài học kinh nghiệm<textarea placeholder="Những điều cần duy trì hoặc cải tiến cho nhiệm vụ tiếp theo..." /></label><div className="form-actions"><button type="button" className="secondary-button">Lưu bản nháp</button><button className="primary-button">Gửi phê duyệt</button></div>{sent && <p className="form-success"><Icon>check_circle</Icon>Báo cáo đã được gửi để phê duyệt.</p>}</form></>; }

function AarReview({ summary }) { const title = summary ? "Tổng kết chiến dịch" : "Duyệt báo cáo AAR"; return <><section className="page-title"><span>After Action Report</span><h1>{title}</h1><p>{summary ? "Chỉ số hiệu quả và các đề xuất cải tiến sau chiến dịch." : "Đánh giá nội dung trước khi công bố vào kho tri thức."}</p></section>{summary ? <Summary /> : <ReviewList />}</>; }
function ReviewList() { return <section className="content-grid"><article className="panel wide"><div className="panel-title"><h2>Báo cáo chờ duyệt</h2><span className="tag orange">12 báo cáo</span></div>{["#AAR-084 · Mất tín hiệu tạm thời tại Khu vực A", "#AAR-083 · Phát hiện điểm nóng bất thường", "#AAR-082 · Pin giảm nhanh trong gió ngược"].map((report) => <div className="review-item" key={report}><div><strong>{report}</strong><p>Người gửi: Phi công Nguyễn V. · Hôm nay, 10:20</p></div><div><button className="secondary-button">Xem</button><button className="primary-button">Duyệt</button></div></div>)}</article><article className="panel"><h2>Tiêu chí phê duyệt</h2><p className="muted">Kiểm tra thông tin nhiệm vụ, mức độ chính xác và khả năng tái sử dụng của bài học.</p><Status label="Đủ thông tin" value="Bắt buộc" /><Status label="Có bằng chứng" value="Khuyến nghị" /></article></section>; }
function Summary() { return <section className="summary-grid"><Card icon="flight" title="126" text="Tổng số chuyến bay" /><Card icon="schedule" title="284 giờ" text="Thời gian vận hành" /><Card icon="task_alt" title="94%" text="Nhiệm vụ hoàn thành" /><Card icon="lightbulb" title="37" text="Bài học được ghi nhận" /><article className="panel wide"><h2>Xu hướng báo cáo AAR</h2><div className="chart">{[42, 68, 50, 85, 60, 91, 72].map((height, index) => <span key={index} style={{ height: `${height}%` }}><i>{index + 1}</i></span>)}</div></article></section>; }

function Analytics() { return <><section className="page-title"><span>Báo cáo điều hành</span><h1>Thống kê &amp; KPI</h1><p>Báo cáo hiệu quả vận hành và mức độ khai thác tri thức.</p></section><section className="summary-grid kpi-grid"><Card icon="trending_up" title="92%" text="Tỷ lệ hoàn thành nhiệm vụ" /><Card icon="menu_book" title="1.248" text="Lượt tra cứu tri thức" /><Card icon="fact_check" title="86%" text="AAR được duyệt đúng hạn" /><Card icon="group" title="48" text="Thành viên hoạt động" /></section><section className="content-grid analytics-panel"><article className="panel wide"><div className="panel-title"><h2>Hiệu suất theo tuần</h2><button className="secondary-button">7 ngày qua</button></div><div className="line-chart"><svg viewBox="0 0 700 230" preserveAspectRatio="none"><polyline points="0,180 100,150 200,164 300,85 400,112 500,52 600,88 700,25" /></svg></div></article><article className="panel"><h2>Phân loại sự cố</h2><div className="donut"><span>72<small>tổng sự cố</small></span></div><div className="legend"><p><i className="green" />Kỹ thuật 43%</p><p><i className="orange-dot" />Thời tiết 31%</p><p><i className="gray" />Khác 26%</p></div></article></section></>; }

function Sop() { return <><section className="page-title"><span>Quản trị tài liệu</span><h1>Phân phối SOP</h1><p>Cấu hình đối tượng nhận và yêu cầu tuân thủ tài liệu chuẩn.</p></section><section className="sop-grid"><article className="panel"><h2>Chọn tri thức để phân phối</h2><div className="selected-document"><Icon>description</Icon><div><strong>[SOP Mới] Quy trình cất cánh UAV trong điều kiện khói mù cấp độ 3</strong><p>Phiên bản 2.1 · Đã phê duyệt</p></div></div></article><article className="panel"><h2>Đối tượng áp dụng</h2>{["Đội UAV Cẩm Phả", "Lực lượng Kiểm lâm cơ động", "Phi công mới (Onboarding)"].map((label, i) => <label className="check-row" key={label}><input type="checkbox" defaultChecked={i !== 1} />{label}<small>{i === 0 ? "12 thành viên" : i === 1 ? "45 thành viên" : "Nhóm tự động"}</small></label>)}</article><article className="panel"><h2>Cấu hình hành động</h2><label className="switch-row">Gửi cảnh báo khẩn cấp qua SMS/App<input type="checkbox" defaultChecked /></label><label className="switch-row">Bắt buộc ký nhận đã hiểu<input type="checkbox" defaultChecked /></label><label className="switch-row">Tích hợp vào bài thi<input type="checkbox" /></label></article></section><div className="form-actions fixed-actions"><button className="secondary-button">Hủy bỏ</button><button className="primary-button">Phân phối tài liệu</button></div></>; }

function GenericPage({ pathname }) { const [title, subtitle] = screenInfo[pathname] || screenInfo["/kho-tri-thuc/tong-hop-chien-dich"]; return <><section className="page-title"><span>UAV Knowledge</span><h1>{title}</h1><p>{subtitle}</p></section><section className="panel empty-state"><Icon>construction</Icon><h2>Không gian làm việc đang được chuẩn bị</h2><p>Nội dung sẽ được đồng bộ theo thiết kế của hệ thống.</p></section></>; }

function Login({ go }) { const [showPassword, setShowPassword] = useState(false); return <main className="login-page"><section className="login-hero"><div><span className="hero-icon"><Icon>flight_takeoff</Icon></span><h1>Hệ thống Quản trị Tri thức UAV</h1><p>Chi cục Kiểm lâm Tỉnh Quảng Ninh</p></div></section><section className="login-section"><form className="login-form" onSubmit={(event) => { event.preventDefault(); go("/"); }}><div className="login-heading"><h1>Đăng nhập hệ thống</h1><p>Vui lòng nhập thông tin để truy cập không gian làm việc.</p></div><label>Tên đăng nhập hoặc Mã số cán bộ<div className="input-icon"><Icon>person</Icon><input required placeholder="Nhập tên đăng nhập" /></div></label><label>Mật khẩu<div className="input-icon"><Icon>lock</Icon><input required type={showPassword ? "text" : "password"} placeholder="••••••••" /><button type="button" onClick={() => setShowPassword(!showPassword)}><Icon>{showPassword ? "visibility_off" : "visibility"}</Icon></button></div></label><div className="login-options"><label><input type="checkbox" /> Ghi nhớ đăng nhập</label><a href="#">Quên mật khẩu?</a></div><button className="login-button">ĐĂNG NHẬP</button><div className="or"><span />HOẶC<span /></div><button type="button" className="sso-button"><Icon>admin_panel_settings</Icon>ĐĂNG NHẬP BẰNG TÀI KHOẢN CỔNG DỊCH VỤ CÔNG SSO</button></form></section></main>; }

export default function Application() {
  const pathname = usePathname();
  const router = useRouter();
  const go = (href) => router.push(href);
  if (pathname === "/dang-nhap") return <Login go={go} />;
  const logout = () => { try { window.localStorage.removeItem("kms-active-role"); } catch {} go("/dang-nhap"); };
  let page = <GenericPage pathname={pathname} />;
  if (pathname === "/") page = <Dashboard go={go} />;
  if (pathname === "/dieu-hanh") page = <CommandCenter />;
  if (pathname === "/kho-tri-thuc/tong-hop-chien-dich") page = <KnowledgeHome />;
  if (pathname === "/kho-tri-thuc/ho-so-khong-gian") page = <KnowledgeHome terrain />;
  if (pathname === "/kho-tri-thuc/lich-su-tien-hoa") page = <KnowledgeHome history />;
  if (pathname === "/bao-cao-aar/gui") page = <AarSubmit />;
  if (pathname === "/bao-cao-aar" || pathname === "/duyet-bai") page = <AarReview />;
  if (pathname === "/bao-cao-aar/tong-ket") page = <AarReview summary />;
  if (pathname === "/thong-ke") page = <Analytics />;
  if (pathname === "/phan-phoi-sop") page = <Sop />;
  return <div className="app-shell"><Sidebar pathname={pathname} go={go} /><div className="app-main"><Header onLogout={logout} /><main className="page-content">{page}</main></div></div>;
}
