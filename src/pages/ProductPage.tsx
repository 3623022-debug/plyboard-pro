import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Upload, Trash2, Lock, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getProduct } from "@/lib/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const ADMIN_PASSWORD = "5656";
const BUCKET = "product-pdfs";

const ProductPage = () => {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_ok") === "1");
  const [pwd, setPwd] = useState("");
  const [busy, setBusy] = useState(false);

  const filePath = `${slug}.pdf`;

  const refresh = async () => {
    setLoading(true);
    // Try to find file
    const { data, error } = await supabase.storage.from(BUCKET).list("", { search: filePath });
    if (!error && data?.some((f) => f.name === filePath)) {
      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
      // bust cache
      setPdfUrl(`${pub.publicUrl}?t=${Date.now()}`);
    } else {
      setPdfUrl(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (product) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-24 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Товар не найден</h1>
          <Link to="/" className="text-primary-glow hover:underline">На главную</Link>
        </div>
      </div>
    );
  }

  const checkPwd = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_ok", "1");
      setAuthed(true);
      setPwd("");
      toast.success("Доступ администратора получен");
    } else {
      toast.error("Неверный пароль");
    }
  };

  const onUpload = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Загрузите файл в формате PDF");
      return;
    }
    setBusy(true);
    const { error } = await supabase.storage.from(BUCKET).upload(filePath, file, {
      upsert: true,
      contentType: "application/pdf",
    });
    setBusy(false);
    if (error) {
      toast.error("Ошибка загрузки: " + error.message);
    } else {
      toast.success("PDF загружен");
      refresh();
    }
  };

  const onDelete = async () => {
    if (!confirm("Удалить PDF?")) return;
    setBusy(true);
    const { error } = await supabase.storage.from(BUCKET).remove([filePath]);
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Удалено");
      refresh();
    }
  };

  const Icon = product.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{product.seoTitle}</title>
        <meta name="description" content={product.seoDescription} />
        <meta name="keywords" content={product.keywords} />
        <link rel="canonical" href={`https://russply.ru/product/${product.slug}`} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.seoTitle} />
        <meta property="og:description" content={product.seoDescription} />
        <meta property="og:url" content={`https://russply.ru/product/${product.slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.seoDescription,
          category: "Фанера",
          brand: { "@type": "Brand", name: "Русская Фанера" },
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "RUB",
            url: `https://russply.ru/product/${product.slug}`,
            seller: { "@type": "Organization", name: "Русская Фанера" },
          },
        })}</script>
      </Helmet>
      <Header />
      <main className="flex-1 bg-soft py-12">
        <div className="container max-w-5xl">
          <Link to="/#products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> К каталогу
          </Link>

          <div className="flex items-start gap-5 mb-8">
            <div className="w-14 h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">{product.title}</h1>
              <p className="text-muted-foreground">{product.desc}</p>
              <div className="text-sm font-medium text-foreground mt-2">{product.sizes}</div>
            </div>
          </div>

          <div className="bg-card-soft rounded-2xl border border-border shadow-soft overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-muted-foreground">Загрузка…</div>
            ) : pdfUrl ? (
              <iframe
                src={pdfUrl}
                title={`${product.title} — описание`}
                className="w-full"
                style={{ height: "80vh", border: 0 }}
              />
            ) : (
              <div className="p-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Описание товара пока не загружено.</p>
              </div>
            )}
          </div>

          {/* Admin controls */}
          <div className="mt-6">
            {!showAdmin ? (
              <button
                onClick={() => setShowAdmin(true)}
                className="text-xs text-muted-foreground/60 hover:text-primary inline-flex items-center gap-1"
              >
                <Lock className="w-3 h-3" /> Управление (для администратора)
              </button>
            ) : !authed ? (
              <form onSubmit={checkPwd} className="flex gap-2 items-center max-w-sm">
                <input
                  type="password"
                  autoFocus
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  placeholder="Пароль администратора"
                  className="flex-1 px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <button type="submit" className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg text-sm hover:opacity-90">
                  Войти
                </button>
              </form>
            ) : (
              <div className="bg-card-soft rounded-xl border border-border p-4 flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-primary mr-2">Админ:</span>
                <label className={`inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg text-sm cursor-pointer hover:opacity-90 ${busy ? "opacity-50 pointer-events-none" : ""}`}>
                  <Upload className="w-4 h-4" />
                  {pdfUrl ? "Заменить PDF" : "Загрузить PDF"}
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onUpload(f);
                      e.target.value = "";
                    }}
                  />
                </label>
                {pdfUrl && (
                  <button
                    onClick={onDelete}
                    disabled={busy}
                    className="inline-flex items-center gap-2 border border-destructive text-destructive font-semibold px-4 py-2 rounded-lg text-sm hover:bg-destructive/10 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" /> Удалить
                  </button>
                )}
                <span className="text-xs text-muted-foreground ml-auto">Файл: {filePath}</span>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
