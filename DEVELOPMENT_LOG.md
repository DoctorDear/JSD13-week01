# 📝 Development & Interaction Log (ประวัติการพัฒนาและสนทนา)

บันทึกประวัติการพัฒนาซอฟต์แวร์และการทำงานร่วมกันระหว่างนักพัฒนากับผู้ช่วยเขียนโค้ด AI (Antigravity) ในโครงการ **Botanica** ซึ่งเป็นส่วนหนึ่งของการเรียนรู้ในหลักสูตรของ **Generation Thailand** 🇹🇭

---

## 📅 ข้อมูลเซสชัน (Session Metadata)
* **วันที่พัฒนา**: 2 กรกฎาคม 2026
* **นักพัฒนา/ผู้เรียน**: DoctorDear (Generation Thailand Student)
* **ผู้ช่วยพัฒนา**: Antigravity (AI Coding Assistant)
* **ชื่อโครงการ**: Botanica // Curated Houseplant Sanctuary
* **ประเภทเว็บไซต์**: Static Web Application (HTML5 / Vanilla CSS3 / ES6 Javascript)
* **ลิงก์ปลายทาง Repository**: [GitHub - JSD13-week01](https://github.com/DoctorDear/JSD13-week01.git)

---

## ⏱️ ลำดับขั้นตอนการดำเนินงาน (Timeline of Actions)

### 1. การวางระบบและโครงสร้างฐานข้อมูล (Data Modeling)
* **สิ่งที่ทำ**: สร้างไฟล์ข้อมูลหลัก [data.js](file:///Users/doctordear/Code/JSD13/week-01/first-meet-git/data.js) 
* **โครงสร้าง**: ออกแบบข้อมูลพันธุ์ไม้หายากด้วย **Array of Objects** โดยในวัตถุแต่ละชิ้น (Object) มีการซ้อนข้อมูลชั้นใน (Nested Object) เช่น `careGuide` เพื่อเก็บข้อมูลการดูแล ได้แก่ ระดับความชื้น ดิน และอุณหภูมิที่เหมาะสม
* **การแก้ไขปัญหา CORS**: เพื่อให้ผู้เรียนสามารถทดสอบรันโค้ดแบบดับเบิ้ลคลิกไฟล์ในเครื่องได้ทันทีโดยไม่ติดปัญหานโยบายความปลอดภัย CORS ของเว็บเบราว์เซอร์ จึงเปลี่ยนการส่งออกข้อมูลจากการใช้ ES Modules (`export/import`) มาเป็นการผูกเข้ากับ `window.plants` แบบ Global Variable แทน

### 2. การสร้างเลย์เอาต์โครงสร้าง (Semantic Markup)
* **สิ่งที่ทำ**: สร้างไฟล์ [index.html](file:///Users/doctordear/Code/JSD13/week-01/first-meet-git/index.html)
* **รายละเอียด**: เขียนโครงสร้างตามหลัก Semantic HTML5 (มี `<header>`, `<main>`, `<section>`, `<aside>`) เพื่อความถูกต้องตามหลัก SEO ปลั๊กอินไอคอนเวกเตอร์ SVG ดิบเพื่อให้เว็บทำงานรวดเร็ว และกำหนดกล่องเป้าหมายสำหรับให้ JS วาดการ์ดแสดงผลแบบไดนามิก

### 3. การออกแบบรูปลักษณ์และสไตล์ (Visual System Design)
* **สิ่งที่ทำ**: สร้างไฟล์ [style.css](file:///Users/doctordear/Code/JSD13/week-01/first-meet-git/style.css)
* **สไตล์**: ออกแบบภายใต้ธีม "Dark Forest" (สีเขียวเข้มและสีดำหรูหรา) เน้นเอฟเฟกต์ Glassmorphism (`backdrop-filter`) มีการทำแอนิเมชันตอนชี้การ์ด (Card lift & Image zoom) รวมถึงเอฟเฟกต์การสไลด์เปิด-ปิดลิ้นชัก (Drawer) จากขวาไปซ้ายสำหรับแสดงรายละเอียดและหน้า Wishlist

### 4. การเขียนสคริปต์ควบคุมและประมวลผล (App Logic & States)
* **สิ่งที่ทำ**: สร้างไฟล์ [app.js](file:///Users/doctordear/Code/JSD13/week-01/first-meet-git/app.js)
* **คุณลักษณะการทำงาน**:
  * **Real-time Filter & Sort**: กรองข้อมูลตามชื่อต้นไม้/คำอธิบาย และกรองตามหมวดหมู่ความยากง่ายในการดูแล พร้อมระบบจัดเรียงราคา (สูง-ต่ำ) และตัวอักษร
  * **Interactive Drawer**: แสดงผลหน้าข้อมูลต้นไม้อย่างละเอียดเมื่อกด "Quick View"
  * **Wishlist Manager**: เพิ่ม/ลดต้นไม้ที่ชอบ โดยข้อมูลเซฟลงในระบบเก็บข้อมูลของเบราว์เซอร์ (`localStorage`) อัปเดตตัวเลขรวมราคาสุทธิแบบเรียลไทม์ และระบบจำลองปุ่ม Checkout
  * **Toast Notification**: ป๊อปอัปแจ้งเตือนสั้น ๆ ที่จะเด้งมุมล่างเมื่อกดหยิบใส่ตะกร้าหรือถอดออก

### 5. การปรับแต่งเพื่อส่งขึ้น GitHub (Git Configuration & Sync)
* **สิ่งที่ทำ**:
  * สร้างไฟล์ [.gitignore](file:///Users/doctordear/Code/JSD13/week-01/first-meet-git/.gitignore) เพื่อตัดโฟลเดอร์หรือไฟล์ขยะของระบบปฏิบัติการและ IDE ออกก่อนการคอมมิต
  * ตรวจสอบสถานะและรีโมทชี้ไปยัง GitHub เผยแพร่บรานช์หลักชื่อ `main`
  * รันคำสั่ง `git add`, `git commit` และ `git push origin main` สำเร็จเรียบร้อย ทำให้หน้าเว็บและเอกสารทั้งหมดซิงก์สู่ระบบคลาวด์แล้ว

---

## 💬 สรุปหัวข้อการสนทนาที่สำคัญ (Discussion Highlights)
1. **การเลือกรันไฟล์**: การเลือกเชื่อมโค้ดแบบ JavaScript Script Tag ปกติ เพื่อป้องกันการเกิด Error ขณะดับเบิ้ลคลิกไฟล์ทดสอบใน Local (ดีกว่าการบังคับใช้ `type="module"` ที่จะเกิด CORS Block ยกเว้นเมื่อเปิดผ่าน Live Server)
2. **การใส่เครดิตที่มา**: เพิ่มเครดิตให้กับ AI Assistant และระบุว่าเป็นชิ้นงานการศึกษาของสถาบัน **Generation Thailand** ลงในไฟล์หลักประกอบด้วยหน้าเว็บจริง [index.html](file:///Users/doctordear/Code/JSD13/week-01/first-meet-git/index.html) ไฟล์เอกสารอธิบายฟังก์ชัน [PRD.md](file:///Users/doctordear/Code/JSD13/week-01/first-meet-git/PRD.md) และคู่มือติดตั้ง [README.md](file:///Users/doctordear/Code/JSD13/week-01/first-meet-git/README.md)
3. **การตั้งค่า GitHub Pages**: คำแนะนำในการนำโค้ดที่ Push ขึ้น GitHub แล้ว ไปเปิดใช้งานบริการโฮสต์หน้าเว็บฟิสิกส์ออนไลน์ฟรีผ่านแถบเมนู Settings เพื่อนำลิงก์ไปอวดผลงาน
