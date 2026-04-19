import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '快手主播新西兰直播溯源之旅',
  description: '5-6月完整方案 | 18个品牌矩阵 | 政治资源与高端接待',
};

export default function KuaishouLivestreamPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1B3A6B 0%, #2E5090 100%)' }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Microsoft YaHei', Arial, sans-serif;
          color: #2C2C2C;
          line-height: 1.6;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
        }

        .hero {
          background: linear-gradient(135deg, #1B3A6B 0%, rgba(27, 58, 107, 0.8) 100%),
                      url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80');
          background-size: cover;
          background-position: center;
          color: white;
          padding: 120px 40px;
          text-align: center;
          border-radius: 10px;
          margin-bottom: 40px;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(27, 58, 107, 0.4);
          z-index: -1;
        }

        .hero h1 {
          font-size: 56px;
          margin-bottom: 20px;
          color: #D4AF37;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .hero h2 {
          font-size: 48px;
          margin-bottom: 20px;
          color: white;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .hero p {
          font-size: 24px;
          color: #D4AF37;
          margin-bottom: 20px;
        }

        .subtitle {
          font-size: 14px;
          color: #ccc;
          font-style: italic;
        }

        .section {
          background: white;
          margin-bottom: 30px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .section-title {
          background: linear-gradient(135deg, #D4AF37 0%, #C99A2E 100%);
          color: #1B3A6B;
          padding: 20px 30px;
          font-size: 28px;
          font-weight: bold;
        }

        .section-content {
          padding: 30px;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }

        .grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .card {
          background: #F5F5F5;
          border: 2px solid #D4AF37;
          border-radius: 8px;
          padding: 20px;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(212, 175, 55, 0.2);
        }

        .card h3 {
          color: #1B3A6B;
          margin-bottom: 10px;
          font-size: 16px;
        }

        .image-container {
          width: 100%;
          height: 250px;
          background: #E8E8E8;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .feature-box {
          background: linear-gradient(135deg, #2E5090 0%, #1B3A6B 100%);
          color: white;
          padding: 30px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .feature-box h3 {
          color: #D4AF37;
          margin-bottom: 15px;
          font-size: 20px;
        }

        .feature-list {
          list-style: none;
          padding: 0;
        }

        .feature-list li {
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .feature-list li:before {
          content: "✓ ";
          color: #D4AF37;
          font-weight: bold;
          margin-right: 10px;
        }

        .brand-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .brand-item {
          background: white;
          border-left: 4px solid #D4AF37;
          padding: 15px;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand-name {
          font-weight: bold;
          color: #1B3A6B;
        }

        .brand-info {
          font-size: 12px;
          color: #666;
        }

        .brand-comm {
          background: #D4AF37;
          color: #1B3A6B;
          padding: 5px 12px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 12px;
        }

        .resource-card {
          background: white;
          border: 2px solid #D4AF37;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s;
        }

        .resource-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 16px rgba(212, 175, 55, 0.2);
        }

        .resource-image {
          width: 100%;
          height: 180px;
          background: #E8E8E8;
          overflow: hidden;
        }

        .resource-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .resource-info {
          padding: 20px;
        }

        .resource-info h4 {
          color: #1B3A6B;
          margin-bottom: 8px;
          font-size: 16px;
        }

        .resource-info p {
          color: #666;
          font-size: 12px;
        }

        .footer {
          background: #1B3A6B;
          color: white;
          text-align: center;
          padding: 30px;
          margin-top: 50px;
          border-radius: 8px;
        }

        .footer h2 {
          color: #D4AF37;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .grid-2, .grid-4 { grid-template-columns: 1fr; }
          .hero h1 { font-size: 32px; }
          .hero h2 { font-size: 28px; }
        }
      `}</style>

      <div className="container">
        {/* 封面 */}
        <div className="hero">
          <h1>快手主播</h1>
          <h2>新西兰直播溯源之旅</h2>
          <p>5-6月全程方案</p>
          <p className="subtitle">China Travel Service × Premium Brands</p>
        </div>

        {/* 项目概览 */}
        <div className="section">
          <div className="section-title">📋 项目概览</div>
          <div className="section-content">
            <div className="grid-2">
              <div>
                <div className="feature-box">
                  <h3>核心价值主张</h3>
                  <ul className="feature-list">
                    <li>品牌直播溯源与政要接待相结合</li>
                    <li>8+品牌矩阵，佣金40-50%高返</li>
                    <li>新西兰特产生鲜基地参观</li>
                    <li>5星酒店、豪车、私人飞机全程保障</li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="feature-box" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #C99A2E 100%)', color: '#1B3A6B' }}>
                  <h3 style={{ color: '#1B3A6B' }}>📊 品牌矩阵</h3>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '15px 0', color: '#1B3A6B' }}>18个品牌</p>
                  <p style={{ color: '#1B3A6B' }}>覆盖5大消费品类</p>
                </div>
                <div className="feature-box" style={{ marginTop: '15px' }}>
                  <h3>💰 佣金结构</h3>
                  <p style={{ color: '#D4AF37', fontSize: '16px', margin: '8px 0' }}>保健品/护肤: <strong>40-50%</strong></p>
                  <p style={{ color: '#D4AF37', fontSize: '16px', margin: '8px 0' }}>特产类: <strong>25-30%</strong></p>
                  <p style={{ color: '#D4AF37', fontSize: '16px', margin: '8px 0' }}>生鲜/乳制: <strong>15-25%</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 品牌矩阵 I */}
        <div className="section">
          <div className="section-title">💊 品牌矩阵 I | 保健品 & 护肤品 (40-55% 佣金)</div>
          <div className="section-content">
            <div className="grid-2">
              <div>
                <div className="image-container">
                  <img src="https://images.unsplash.com/photo-1548089088-f8e27cf27e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="保健品" />
                </div>
                <div className="brand-grid">
                  <div className="brand-item">
                    <div>
                      <div className="brand-name">好健康</div>
                      <div className="brand-info">保健品</div>
                    </div>
                    <div className="brand-comm">45%</div>
                  </div>
                  <div className="brand-item">
                    <div>
                      <div className="brand-name">澳乐维他</div>
                      <div className="brand-info">保健品</div>
                    </div>
                    <div className="brand-comm">45%</div>
                  </div>
                  <div className="brand-item">
                    <div>
                      <div className="brand-name">Swisse</div>
                      <div className="brand-info">保健品</div>
                    </div>
                    <div className="brand-comm">40%</div>
                  </div>
                  <div className="brand-item">
                    <div>
                      <div className="brand-name">Max Healthy</div>
                      <div className="brand-info">基础保健</div>
                    </div>
                    <div className="brand-comm">42%</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="image-container">
                  <img src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="护肤品" />
                </div>
                <div className="brand-grid">
                  <div className="brand-item">
                    <div>
                      <div className="brand-name">Vita Folkes</div>
                      <div className="brand-info">女性保健</div>
                    </div>
                    <div className="brand-comm">48%</div>
                  </div>
                  <div className="brand-item">
                    <div>
                      <div className="brand-name">Lifespace</div>
                      <div className="brand-info">益生菌</div>
                    </div>
                    <div className="brand-comm">45%</div>
                  </div>
                  <div className="brand-item">
                    <div>
                      <div className="brand-name">澳容 (Earon)</div>
                      <div className="brand-info">护肤品</div>
                    </div>
                    <div className="brand-comm">50%</div>
                  </div>
                  <div className="brand-item">
                    <div>
                      <div className="brand-name">Coco Brownie</div>
                      <div className="brand-info">护肤品</div>
                    </div>
                    <div className="brand-comm">55%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 品牌矩阵 II */}
        <div className="section">
          <div className="section-title">🎁 品牌矩阵 II | 特产 & 家居日化 (25-30% 佣金)</div>
          <div className="section-content">
            <div className="grid-2">
              <div className="brand-grid">
                <div className="brand-item">
                  <div>
                    <div className="brand-name">新西兰羊毛被</div>
                    <div className="brand-info">特产</div>
                  </div>
                  <div className="brand-comm">30%</div>
                </div>
                <div className="brand-item">
                  <div>
                    <div className="brand-name">澳洲/NZ葡萄酒</div>
                    <div className="brand-info">特产</div>
                  </div>
                  <div className="brand-comm">28%</div>
                </div>
                <div className="brand-item">
                  <div>
                    <div className="brand-name">UGG 雪地靴</div>
                    <div className="brand-info">特产</div>
                  </div>
                  <div className="brand-comm">30%</div>
                </div>
                <div className="brand-item">
                  <div>
                    <div className="brand-name">Waston's son</div>
                    <div className="brand-info">蜂蜜</div>
                  </div>
                  <div className="brand-comm">27%</div>
                </div>
              </div>
              <div>
                <div className="image-container">
                  <img src="https://images.unsplash.com/photo-1510812431401-41d2cab2707d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="葡萄酒" />
                </div>
                <div className="brand-grid">
                  <div className="brand-item">
                    <div>
                      <div className="brand-name">Malory</div>
                      <div className="brand-info">洗衣液</div>
                    </div>
                    <div className="brand-comm">25%</div>
                  </div>
                  <div className="brand-item">
                    <div>
                      <div className="brand-name">Bribeam</div>
                      <div className="brand-info">牙膏</div>
                    </div>
                    <div className="brand-comm">26%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 品牌矩阵 III */}
        <div className="section">
          <div className="section-title">🥩 品牌矩阵 III | 生鲜 & 乳制品 (15-25% 佣金)</div>
          <div className="section-content">
            <div className="brand-grid">
              <div className="brand-item">
                <div>
                  <div className="brand-name">新西兰草饲牛羊肉</div>
                  <div className="brand-info">生鲜</div>
                </div>
                <div className="brand-comm">20%</div>
              </div>
              <div className="brand-item">
                <div>
                  <div className="brand-name">新西兰活龙虾</div>
                  <div className="brand-info">生鲜</div>
                </div>
                <div className="brand-comm">18%</div>
              </div>
              <div className="brand-item">
                <div>
                  <div className="brand-name">新西兰黑金鲍鱼</div>
                  <div className="brand-info">生鲜</div>
                </div>
                <div className="brand-comm">22%</div>
              </div>
              <div className="brand-item">
                <div>
                  <div className="brand-name">生蚝、青口等海产</div>
                  <div className="brand-info">生鲜</div>
                </div>
                <div className="brand-comm">20%</div>
              </div>
              <div className="brand-item">
                <div>
                  <div className="brand-name">多品牌成人奶粉</div>
                  <div className="brand-info">乳制品</div>
                </div>
                <div className="brand-comm">18%</div>
              </div>
              <div className="brand-item">
                <div>
                  <div className="brand-name">Muchmoore 冰淇淋</div>
                  <div className="brand-info">乳制品</div>
                </div>
                <div className="brand-comm">20%</div>
              </div>
              <div className="brand-item">
                <div>
                  <div className="brand-name">Wdom 中老年高钙奶粉</div>
                  <div className="brand-info">乳制品</div>
                </div>
                <div className="brand-comm">25%</div>
              </div>
            </div>
            <div className="image-container" style={{ marginTop: '30px' }}>
              <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="牛羊肉" />
            </div>
          </div>
        </div>

        {/* 政治资源 */}
        <div className="section">
          <div className="section-title">🏛️ 政治资源与高端接待</div>
          <div className="section-content">
            <div className="grid-2">
              <div>
                <div className="feature-box">
                  <h3>部长级/国家级接见</h3>
                  <ul className="feature-list">
                    <li>新西兰总理接见</li>
                    <li>旅游部长正式会晤</li>
                    <li>奥克兰市长晚宴</li>
                    <li>执政党国家党领导接待</li>
                    <li>国会参观与贸易讨论</li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="feature-box">
                  <h3>商务晚宴与授权</h3>
                  <ul className="feature-list">
                    <li>中新贸易协会欢迎晚宴</li>
                    <li>官方授权证书颁发</li>
                    <li>本地企业家见面晚宴</li>
                    <li>品牌推介会</li>
                    <li>媒体见面会与签约仪式</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 直播场景 */}
        <div className="section">
          <div className="section-title">🎬 直播场景</div>
          <div className="section-content">
            <div className="grid-2">
              <div>
                <div className="image-container">
                  <img src="https://images.unsplash.com/photo-1618773421522-1897e228707f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="5星酒店" />
                </div>
                <h3 style={{ color: '#1B3A6B', margin: '15px 0' }}>🏨 5星地标酒店</h3>
                <ul className="feature-list">
                  <li>高空景观直播间 (280°城市全景)</li>
                  <li>天然采光 + 专业灯光</li>
                  <li>4K直播设备配置</li>
                  <li>品牌展示台 & 产品陈列区</li>
                </ul>
              </div>
              <div>
                <div className="image-container">
                  <img src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="农场" />
                </div>
                <h3 style={{ color: '#1B3A6B', margin: '15px 0' }}>🚜 工厂 & 农场直播</h3>
                <ul className="feature-list">
                  <li>保健品工厂生产线展示</li>
                  <li>牛羊肉养殖基地参观</li>
                  <li>生蚝养殖场直播</li>
                  <li>野生捕捞现场展示</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 配套资源 */}
        <div className="section">
          <div className="section-title">🚗 配套资源 | 贵宾级出行</div>
          <div className="section-content">
            <div className="grid-4">
              <div className="resource-card">
                <div className="resource-image">
                  <img src="https://images.unsplash.com/photo-1617654112368-307921291f34?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="豪车" />
                </div>
                <div className="resource-info">
                  <h4>🚗 奔驰13座豪华客车</h4>
                  <p>全程专属司机 | 空调+WiFi</p>
                </div>
              </div>
              <div className="resource-card">
                <div className="resource-image">
                  <img src="https://images.unsplash.com/photo-1561061948-d2da40adc84f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="私人飞机" />
                </div>
                <div className="resource-info">
                  <h4>✈️ 私人飞机</h4>
                  <p>城市间往返 | 奥克兰↔皇后镇</p>
                </div>
              </div>
              <div className="resource-card">
                <div className="resource-image">
                  <img src="https://images.unsplash.com/photo-1587537298346-2e52a9f128e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="游艇" />
                </div>
                <div className="resource-info">
                  <h4>⛵ 私人游艇</h4>
                  <p>海滨直播体验 | 品酒晚宴</p>
                </div>
              </div>
              <div className="resource-card">
                <div className="resource-image">
                  <img src="https://images.unsplash.com/photo-1516534775068-bb6c1305a8d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="直播" />
                </div>
                <div className="resource-info">
                  <h4>📱 专业直播团队</h4>
                  <p>4K摄像 | 实时数据 | 舞台设计</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <div className="footer">
          <h2>🎯 携手共赢</h2>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>5-6月新西兰直播溯源之旅</p>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '8px' }}>
            <p style={{ marginBottom: '10px' }}><strong>下一步行动：</strong></p>
            <p>✓ 确认合作品牌清单</p>
            <p>✓ 敲定行程时间表</p>
            <p>✓ 签署合作协议</p>
            <p>✓ 启动宣传与筹备</p>
          </div>
          <p style={{ marginTop: '30px', fontSize: '12px', color: '#ccc' }}>
            © 2026 China Travel Service | 生成时间: 2026-04-20
          </p>
        </div>
      </div>
    </div>
  );
}
