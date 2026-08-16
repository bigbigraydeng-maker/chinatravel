import TourParserUpload from '@/components/admin/TourParserUpload';

export default function AdminTourParserPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-semibold text-accent">行程解析(原型)</h2>
        <p className="mt-1 text-warm-700">
          上传行程文档,Claude 解析成结构化 Tour 数据。这一步只做解析验证 —— 不会写入数据库,也不会生成页面。
        </p>
      </div>
      <TourParserUpload />
    </div>
  );
}
