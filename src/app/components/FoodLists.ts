export interface MenuItem {
  name: string;
  price: string;
  img: string;
}

export interface ListItem {
  id: string;
  store: string;
  location: string;
  title: string;
  img: string;
  description: string;
  menus: MenuItem[];
}

export const Lists: ListItem[] = [
  {
    id: 'f1',
    store: 'おむすびすみす',
    location: "https://www.instagram.com/omusubismith",
    title: 'おむすび/あげもち/その他 ...',
    img: '/F1/HEADER.webp',
    description: '【2018/12 北海道で初のおむすびキッチンカー】全国各地の魅力的なヒト・コト、モノを結ぶおむすび屋。空色のおむすびワゴン（移動販売車）と恵庭のテイクアウト店舗の２拠点で営業。',
    menus: [
      { name: 'おむすび各種', price: '￥250 ~ 450', img: '/F1/1.webp' },
      { name: '冷やしどて焼き', price: '￥500', img: '/F1/TOP.webp' },
      { name: 'あげもち', price: '￥300', img: '/F1/TOP.webp' },
      { name: 'ペットボトルドリンク', price: '￥150', img: '/F1/TOP.webp' },
    ]
  },
  {
    id: 'f2',
    store: 'Big mams pie',
    location: 'https://www.instagram.com/big_mams_pie_',
    title: 'パイ各種/ソーセージロール',
    img: '/F2/HEADER.webp',
    description: '2012年から、フォルクスワーゲンTYPE IIでパイとシェイク(夏限定)の移動販売をしています。本場のオーストラリアンミートパイ をメインにスイーツパイも車内で焼いて提供しています！生地から一つ一つ手作りの焼きたてパイを是非ご賞味ください。',
    menus: [
      { name: 'パイ各種(主食系)', price: '￥300 ~ 350', img: '/F2/1.webp' },
      { name: 'パイ各種(デザート系)', price: '￥250 ~ 300', img: '/F2/1.webp' },
      { name: 'ソーセージロール', price: '￥500', img: '/F2/1.webp' },
    ]
  },
  {
      id: 'f3',
      store: '夕張マルシェ',
      location: 'https://www.instagram.com/yubari_marche',
      title: 'クレープ/カットメロン/その他 ...',
      img: '/F3/HEADER.webp',
      description: '「北海道 夕張のおいしい」をたくさんの人にお届けしたいというコンセプトでキッチンカー、イベント、催事出店をしています🚛🌟夕張市を始め夕張郡の食材にこだわり、道内外どこへでもその美味しさを伝えに行きます🚛💨',
      menus: [
        { name: '夕張産長いも入りクレープ各種', price: '￥400 ~ 800', img: '/F3/1.webp' },
        { name: '夕張メロン カットメロン', price: '￥600', img: '/F3/2.webp' },
        { name: 'ドリンク各種', price: '￥450 ~ 600', img: '/F3/3.webp' },
      ]
    },
    {
      id: 'f4',
      store: '北海道ベビーカステラ本舗 まる福堂',
      location: 'https://www.instagram.com/marufukudo_fukutama',
      title: 'ベビーカステラ',
      img: '/F4/HEADER.webp',
      description: 'ベビーカステラを北海道素材をメインにこだわって作っています😊札幌近郊を中心に手作りキッチンカーで移動販売♪冷めても美味しい福珠カステラで笑顔になっていただけますように✨',
      menus: [
        { name: 'ベビーカステラ (32玉)', price: '￥1,000', img: '/F4/1.webp' },
        { name: 'ベビーカステラ (15玉)', price: '￥500', img: '/F4/1.webp' },
      ]
    },
    {
      id: 'f5',
      store: 'ViVi POPCORN',
      location: '',
      title: 'ポップコーン',
      img: '/F5/1.webp',
      description: 'NoDescruption',
      menus: [
        { name: 'ソルトポップコーン', price: '￥200', img: '/F5/1.webp' },
      ]
    },
    {
      id: 'f6',
      store: 'ハルキッチン',
      location: '',
      title: '肉まきおにぎり/けずりいちご/その他 ...',
      img: '/NO.webp',
      description: 'NoDescruption',
      menus: [
        { name: 'けずりいちご', price: '￥600', img: '/NO.webp' },
        { name: 'チョコバナナ', price: '￥300', img: '/NO.webp' },
        { name: '肉巻きおにぎり', price: '￥700', img: '/NO.webp' },
      ]
    },
    {
      id: 'f7',
      store: 'パンジ',
      location: '',
      title: 'チュロス/かき氷',
      img: '/NO.webp',
      description: 'NoDescruption',
      menus: [
        { name: 'かき氷', price: '￥300', img: '/NO.webp' },
        { name: 'チュロス', price: '￥400', img: '/NO.webp' },
      ]
    },
    {
      id: 'f8',
      store: 'es キッチン',
      location: '',
      title: 'ジンギスカン焼うどん/ロングポテト/その他 ...',
      img: '/NO.webp',
      description: 'NoDescruption',
      menus: [
        { name: 'アメリカンドッグ', price: '￥350', img: '/NO.webp' },
        { name: 'ロングポテト', price: '￥600 ~', img: '/NO.webp' },
        { name: 'サツマイモチップ', price: '￥500', img: '/NO.webp' },
        { name: 'イチゴシェイク', price: '￥500', img: '/NO.webp' },
        { name: 'たこ焼き', price: '￥600 ~', img: '/NO.webp' },
        { name: 'ジンギスカン焼うどん', price: '￥800 ~', img: '/NO.webp' },
      ]
    },
    {
      id: 'f9',
      store: 'sugar garden',
      location: '',
      title: 'ザンギ/焼きそば',
      img: '/NO.webp',
      description: 'NoDescruption',
      menus: [
        { name: '焼きそば', price: '￥400', img: '/NO.webp' },
        { name: 'ザンギ', price: '￥600', img: '/NO.webp' },
      ]
    },
    {
      id: 'f10',
      store: 'おやRITS',
      location: '',
      title: '激うまフランクフルト',
      img: '/NO.webp',
      description: 'NoDescruption',
      menus: [
        { name: 'フランクフルト', price: '￥-', img: '/NO.webp' },
      ]
    },
];
