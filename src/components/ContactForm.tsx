import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Введите имя").max(100),
  phone: z.string().trim().min(6, "Введите телефон").max(30),
  email: z.string().trim().email("Некорректный email").max(255).or(z.literal("")),
  message: z.string().trim().max(2000).optional(),
});

interface Props {
  prefillCalc?: string;
}

const ContactForm = ({ prefillCalc }: Props) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-lead", {
        body: { ...form, calc: prefillCalc || undefined },
      });
      if (error) throw error;
      toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Не удалось отправить. Попробуйте позже или позвоните нам.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container grid lg:grid-cols-2 gap-12">
        <div>
          <div className="text-sm font-semibold text-primary-glow uppercase tracking-wider mb-3">Связаться</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-5">Оставьте заявку — рассчитаем за 15 минут</h2>
          <p className="text-muted-foreground text-lg mb-8">Менеджер подберёт оптимальный материал, согласует логистику и пришлёт счёт.</p>

          <div className="space-y-5">
            <Info icon={MapPin} title="Адрес склада" value="г. Екатеринбург, Свердловская область" />
            <Info icon={Phone} title="Телефон" value="+7 (343) 000-00-00" href="tel:+73430000000" />
            <Info icon={Mail} title="Email" value="info@russply.ru" href="mailto:info@russply.ru" />
            <Info icon={Clock} title="Режим работы" value="Пн–Пт 9:00–18:00, Сб 10:00–15:00" />
          </div>

          {prefillCalc && (
            <div className="mt-6 p-4 rounded-xl bg-accent/40 border border-accent text-sm">
              <div className="font-semibold text-primary mb-1">К заявке прикреплён расчёт:</div>
              <div className="text-foreground">{prefillCalc}</div>
            </div>
          )}
        </div>

        <form onSubmit={submit} className="bg-card-soft border border-border rounded-2xl p-8 shadow-elegant space-y-4">
          <Input label="Ваше имя *" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="Иван Иванов" />
          <Input label="Телефон *" value={form.phone} onChange={v => setForm({ ...form, phone: v })} placeholder="+7 (___) ___-__-__" type="tel" />
          <Input label="Email" value={form.email} onChange={v => setForm({ ...form, email: v })} placeholder="you@company.ru" type="email" />
          <div>
            <label className="block text-sm font-semibold mb-2">Комментарий</label>
            <textarea
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              rows={4}
              maxLength={2000}
              placeholder="Опишите задачу или необходимый объём"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          <button type="submit" disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3.5 rounded-lg hover:opacity-90 transition-smooth disabled:opacity-50 shadow-soft">
            <Send className="w-4 h-4" />
            {loading ? "Отправляем…" : "Отправить заявку"}
          </button>
          <p className="text-xs text-muted-foreground text-center">
            Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных.
          </p>
        </form>
      </div>
    </section>
  );
};

const Input = ({ label, value, onChange, placeholder, type = "text" }: any) => (
  <div>
    <label className="block text-sm font-semibold mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={255}
      className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
);

const Info = ({ icon: Icon, title, value, href }: any) => {
  const Inner = (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-card-soft border border-border hover:border-primary transition-smooth">
      <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{title}</div>
        <div className="font-semibold text-foreground">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{Inner}</a> : Inner;
};

export default ContactForm;
