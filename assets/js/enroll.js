// enroll.js
(function(){
  const UPI_ID = "9059970025-6@ybl";
  const RECEIVER_NAME = "HAXE STUDIO";

  function getQuery() {
    const q = {};
    location.search.substring(1).split("&").forEach(function(p){
      if(!p) return;
      const [k,v] = p.split("=");
      q[decodeURIComponent(k)] = decodeURIComponent(v||"");
    });
    return q;
  }

  function isMobile() {
    return /Android|iPhone|iPad|iPod|BlackBerry|webOS|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  const q = getQuery();
  const course = q.course || "HAXE STUDIO Course";
  const amount = q.amount || "1999";

  const courseTitle = document.getElementById("courseTitle");
  const courseDesc = document.getElementById("courseDesc");
  if(courseTitle) courseTitle.textContent = course + " — Enroll";
  if(courseDesc) courseDesc.textContent = `You are enrolling for "${course}". Total: ₹${amount}.`;

  const payBtn = document.getElementById("payBtn");
  const waLink = document.getElementById("waLink");
  const postPay = document.getElementById("postPay");
  const qrBtn = document.getElementById("qrBtn");

  function buildUpiLink(amount, note) {
    const pa = encodeURIComponent(UPI_ID);
    const pn = encodeURIComponent(RECEIVER_NAME);
    const am = encodeURIComponent(amount);
    const tn = encodeURIComponent(note || course);
    return `upi://pay?pa=${pa}&pn=${pn}&am=${am}&cu=INR&tn=${tn}`;
  }

  if(payBtn){
    payBtn.addEventListener("click", function(){
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();

      if(!name || !phone){ alert("Please enter name and WhatsApp phone."); return; }

      if(!isMobile()){
        alert("⚠️ UPI payments work only on mobile. Use the QR option or open this page on your phone.\n\nUPI ID: 9059970025-6@ybl");
        return;
      }

      const upi = buildUpiLink(amount, `${course} - ${name}`);
      window.location.href = upi;

      setTimeout(function(){
        postPay.style.display = "block";
        const msg = encodeURIComponent(`Paid for ${course}\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nAmount: ₹${amount}\n(Attach payment screenshot)`);
        waLink.href = `https://wa.me/919059970025?text=${msg}`;
        waLink.textContent = "Send payment screenshot on WhatsApp";
      }, 1200);
    });
  }

  if(qrBtn){
    qrBtn.addEventListener("click", function(){
      const upi = buildUpiLink(amount, `${course}`);
      const qrUrl = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodeURIComponent(upi)}`;
      window.open(qrUrl, "_blank");
    });
  }
})();
