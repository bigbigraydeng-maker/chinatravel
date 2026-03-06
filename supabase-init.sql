-- CTS Tours China Specialist - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 创建 destinations 表
CREATE TABLE IF NOT EXISTS destinations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  image_url VARCHAR(500),
  region VARCHAR(100),
  highlights TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建 tours 表
CREATE TABLE IF NOT EXISTS tours (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  duration VARCHAR(100),
  duration_days INTEGER,
  price_from DECIMAL(10, 2),
  price_display VARCHAR(100),
  image_url VARCHAR(500),
  tour_type VARCHAR(50) CHECK (tour_type IN ('premium', 'value')),
  destinations TEXT[],
  highlights TEXT[],
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建 articles 表
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url VARCHAR(500),
  category VARCHAR(100),
  author VARCHAR(100),
  published_at TIMESTAMP WITH TIME ZONE,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建 enquiries 表
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(100),
  travel_interest VARCHAR(100),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  source VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为各表添加更新时间触发器
CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON destinations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tours_updated_at BEFORE UPDATE ON tours
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enquiries_updated_at BEFORE UPDATE ON enquiries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 插入演示数据到 destinations
INSERT INTO destinations (name, slug, description, short_description, image_url, region, highlights) VALUES
('Beijing', 'beijing', 'China''s capital city, a perfect blend of ancient imperial heritage and modern development. Home to iconic landmarks including the Great Wall, Forbidden City, and Temple of Heaven. Experience authentic Peking duck, explore traditional hutongs, and discover the heart of Chinese civilization.', 'Imperial capital with the Great Wall and Forbidden City', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Beijing%20Forbidden%20City%20historic%20architecture%20majestic&image_size=landscape_16_9', 'North China', ARRAY['Great Wall', 'Forbidden City', 'Temple of Heaven', 'Summer Palace', 'Hutongs']),

('Xi''an', 'xian', 'The ancient capital of 13 dynasties and the eastern terminus of the Silk Road. Home to the world-famous Terracotta Army, ancient city walls, and the Muslim Quarter. A living museum where history comes alive at every corner.', 'Ancient capital home to the Terracotta Army', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xian%20Terracotta%20Army%20ancient%20warriors%20historical&image_size=landscape_16_9', 'Northwest China', ARRAY['Terracotta Army', 'Ancient City Wall', 'Muslim Quarter', 'Big Wild Goose Pagoda', 'Shaanxi History Museum']),

('Shanghai', 'shanghai', 'China''s most cosmopolitan city, where colonial heritage meets futuristic skyline. Explore the historic Bund, wander through traditional shikumen neighborhoods, and experience world-class dining and shopping in this dynamic metropolis.', 'Modern metropolis with historic Bund and futuristic skyline', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Shanghai%20skyline%20Bund%20modern%20city%20night&image_size=landscape_16_9', 'East China', ARRAY['The Bund', 'Yu Garden', 'Shanghai Tower', 'French Concession', 'Nanjing Road']),

('Chengdu', 'chengdu', 'The capital of Sichuan province, famous for its spicy cuisine, teahouse culture, and giant pandas. Experience authentic Sichuan hotpot, visit the Chengdu Research Base of Giant Panda Breeding, and immerse yourself in the relaxed local lifestyle.', 'Home of giant pandas and authentic Sichuan cuisine', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chengdu%20giant%20panda%20bamboo%20forest%20cute&image_size=landscape_16_9', 'Southwest China', ARRAY['Giant Panda Base', 'Jinli Ancient Street', 'Wuhou Shrine', 'Sichuan Cuisine', 'Teahouses']),

('Guilin', 'guilin', 'A landscape painting come to life, with dramatic karst mountains rising from the Li River. Cruise through breathtaking scenery, explore ancient villages, and discover why this region has inspired Chinese artists and poets for centuries.', 'Stunning karst landscapes and Li River scenery', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Guilin%20Li%20River%20karst%20mountains%20bamboo%20raft&image_size=landscape_16_9', 'South China', ARRAY['Li River Cruise', 'Yangshuo', 'Reed Flute Cave', 'Longji Rice Terraces', 'Elephant Trunk Hill']),

('Zhangjiajie', 'zhangjiajie', 'The inspiration for Avatar''s floating mountains, Zhangjiajie features towering sandstone pillars rising from misty valleys. Take the world''s longest cable car ride, walk on glass bridges suspended between peaks, and experience nature''s grandest architecture.', 'Avatar-inspired towering sandstone pillars', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Zhangjiajie%20Avatar%20mountains%20sandstone%20pillars%20mist&image_size=landscape_16_9', 'Central China', ARRAY['Avatar Mountains', 'Glass Bridge', 'Tianmen Mountain', 'Zhangjiajie National Park', 'Baofeng Lake']);

-- 插入演示数据到 tours
INSERT INTO tours (title, slug, description, short_description, duration, duration_days, price_from, price_display, image_url, tour_type, destinations, highlights, is_featured) VALUES
('Imperial China Signature Journey', 'imperial-china-signature-journey', 'Experience the grandeur of imperial China on this signature journey through Beijing, Xi''an, and Shanghai. Walk the Great Wall, stand before the Terracotta Army, and witness the contrast of ancient heritage and modern innovation. This premium journey includes luxury accommodations, private guides, and exclusive access to cultural experiences.', 'A premium journey through China''s imperial heritage', '12 Days / 11 Nights', 12, 5999.00, 'From NZ$5,999 per person', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Great%20Wall%20China%20imperial%20palace%20luxury%20travel&image_size=landscape_16_9', 'premium', ARRAY['Beijing', 'Xi''an', 'Shanghai'], ARRAY['Private Great Wall access', 'Terracotta Army VIP tour', 'Luxury accommodations', 'Personal guide throughout', 'Authentic cultural experiences'], true),

('Yangtze & Heritage Collection', 'yangtze-heritage-collection', 'Combine the majesty of the Yangtze River with China''s most treasured heritage sites. Cruise through the dramatic Three Gorges, explore ancient temples, and discover the timeless beauty of traditional China. This premium collection features luxury river cruise accommodations and curated cultural experiences.', 'Luxury Yangtze cruise combined with heritage exploration', '11 Days / 10 Nights', 11, 5499.00, 'From NZ$5,499 per person', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Yangtze%20River%20cruise%20Three%20Gorges%20luxury%20ship&image_size=landscape_16_9', 'premium', ARRAY['Chongqing', 'Yangtze River', 'Yichang', 'Shanghai'], ARRAY['Luxury river cruise', 'Three Gorges experience', 'Shore excursions', 'Fine dining onboard', 'Cultural performances'], true),

('Classic China Discovery', 'classic-china-discovery', 'Discover China''s essential highlights on this comprehensive journey. From Beijing''s imperial treasures to Shanghai''s modern skyline, experience the diversity of Chinese culture, cuisine, and landscapes. An excellent introduction to China with quality accommodations and expert local guides.', 'Essential China highlights with expert guidance', '10 Days / 9 Nights', 10, 3299.00, 'From NZ$3,299 per person', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20classic%20tour%20Forbidden%20City%20Great%20Wall&image_size=landscape_16_9', 'value', ARRAY['Beijing', 'Xi''an', 'Shanghai'], ARRAY['Great Wall visit', 'Terracotta Warriors', 'Bund waterfront', 'Local cuisine experiences', 'Quality accommodations'], true),

('China Essentials Journey', 'china-essentials-journey', 'Perfect for first-time visitors, this journey covers China''s most iconic destinations. Experience the highlights of Beijing, Xi''an, and Shanghai with carefully selected experiences that showcase the best of Chinese culture, history, and modern life.', 'Iconic destinations for first-time China visitors', '8 Days / 7 Nights', 8, 2499.00, 'From NZ$2,499 per person', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20essentials%20travel%20Beijing%20Shanghai%20highlights&image_size=landscape_16_9', 'value', ARRAY['Beijing', 'Xi''an', 'Shanghai'], ARRAY['Forbidden City', 'Great Wall section', 'Terracotta Warriors', 'Shanghai skyline', 'Cultural experiences'], true);

-- 插入演示数据到 articles
INSERT INTO articles (title, slug, excerpt, content, image_url, category, author, published_at, is_featured) VALUES
('Best Time to Visit China', 'best-time-to-visit-china', 'Discover the optimal seasons for your China journey, from spring blossoms to autumn colors.', 'Planning your China journey requires understanding the country''s vast and varied climate. China''s size means weather conditions can differ dramatically between regions.

**Spring (March to May)**
Spring is one of the best times to visit China. Temperatures are mild, flowers bloom across the country, and rainfall is moderate. Beijing''s parks come alive with cherry blossoms, while Guilin''s landscapes are particularly stunning in spring mist.

**Autumn (September to November)**
Many travelers consider autumn the ideal season for China travel. Clear skies, comfortable temperatures, and stunning fall foliage make this perfect for sightseeing. The Great Wall is particularly beautiful with autumn colors.

**Summer (June to August)**
Summer is hot and humid in most of China, but it''s the best time to visit northern regions and high-altitude areas like Zhangjiajie. Be prepared for crowds during school holidays.

**Winter (December to February)**
Winter offers unique experiences and fewer tourists. Visit Harbin for the famous Ice Festival, or enjoy Beijing''s sights without the crowds. Southern China remains relatively mild and pleasant.

**Regional Considerations**
- North China: Best in spring and autumn
- South China: Year-round, avoid typhoon season (July-September)
- Yangtze River: Spring and autumn for comfortable cruising
- Tibet: May to October for best access', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20spring%20cherry%20blossoms%20beautiful%20scenery&image_size=landscape_16_9', 'Travel Planning', 'CTS Travel Team', NOW(), true),

('China Visa Guide for New Zealanders', 'china-visa-guide-for-new-zealanders', 'Everything New Zealand travelers need to know about obtaining a Chinese visa.', 'New Zealand passport holders require a visa to visit China. Here''s your comprehensive guide to navigating the process.

**Visa Types**
- Tourist Visa (L Visa): For tourism and family visits
- Business Visa (M Visa): For commercial activities
- Transit Visa (G Visa): For transit through China

**Application Process**
1. Complete the online visa application form
2. Prepare required documents:
   - Valid passport (6+ months validity, blank pages)
   - Completed application form
   - Recent passport photo
   - Flight and hotel bookings
   - Travel itinerary
3. Submit to the Chinese Visa Application Service Centre in Auckland or Wellington
4. Pay the visa fee (approximately NZ$140)
5. Collect your visa (typically 4-5 working days)

**144-Hour Visa-Free Transit**
New Zealanders can enjoy visa-free transit for up to 144 hours (6 days) in specific regions including Shanghai, Beijing, and Guangdong Province. Requirements:
- Confirmed onward ticket to third country
- Valid for specific entry/exit ports
- Must stay within the approved region

**Tips for Smooth Processing**
- Apply at least 2-3 weeks before travel
- Ensure all documents are complete
- Double-check passport validity
- Keep copies of all submitted documents

Contact our team for assistance with visa requirements for your specific itinerary.', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20visa%20passport%20travel%20documents&image_size=landscape_16_9', 'Practical Tips', 'CTS Travel Team', NOW(), true),

('Is China Safe to Travel?', 'is-china-safe-to-travel', 'Addressing safety concerns for travelers considering a China journey.', 'China is generally considered one of the safest countries for international travelers, with low rates of violent crime and a strong police presence in tourist areas.

**General Safety**
China ranks highly in global safety indices. Violent crime against foreigners is extremely rare. Petty theft can occur in crowded areas, but is less common than in many Western countries.

**Health Considerations**
- Tap water is not potable; stick to bottled water
- Air quality can be poor in major cities; check AQI forecasts
- Medical facilities in major cities are excellent
- Travel insurance is essential

**Transportation Safety**
- High-speed trains are modern, efficient, and safe
- Domestic flights have good safety records
- Road safety has improved significantly
- Use official taxis or ride-sharing apps

**Cultural Considerations**
- China is very welcoming to foreign visitors
- English is widely spoken in tourist areas
- Photography is generally permitted except in military areas
- Respect local customs and regulations

**Practical Tips**
- Register with SafeTravel (MFAT)
- Keep copies of important documents
- Have your hotel address written in Chinese
- Download translation apps for communication

**Women Travelers**
China is very safe for solo female travelers. Harassment is uncommon, and women can travel confidently throughout the country.

Our experienced team provides comprehensive pre-departure briefings and 24/7 support during your journey.', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20travel%20safe%20tourists%20happy%20vacation&image_size=landscape_16_9', 'Travel Planning', 'CTS Travel Team', NOW(), true);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_destinations_slug ON destinations(slug);
CREATE INDEX IF NOT EXISTS idx_destinations_region ON destinations(region);
CREATE INDEX IF NOT EXISTS idx_tours_slug ON tours(slug);
CREATE INDEX IF NOT EXISTS idx_tours_type ON tours(tour_type);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at);

-- 设置 Row Level Security (RLS)
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- 创建公开读取策略（适用于网站前端）
CREATE POLICY "Public read access for destinations" ON destinations FOR SELECT USING (true);
CREATE POLICY "Public read access for tours" ON tours FOR SELECT USING (true);
CREATE POLICY "Public read access for articles" ON articles FOR SELECT USING (true);

-- 创建 enquiries 插入策略（允许匿名用户提交咨询）
CREATE POLICY "Public insert access for enquiries" ON enquiries FOR INSERT WITH CHECK (true);

-- 注意：enquiries 的读取和更新需要管理员权限
-- 在 Supabase 后台配置管理员角色后添加相应策略
