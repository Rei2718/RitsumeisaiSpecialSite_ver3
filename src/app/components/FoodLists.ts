export interface MenuItem {
    name: string;
    price: string;
    img: string;
  }
  
  export interface ListItem {
    id: string;
    store: string;
    title: string;
    img: string;
    description: string;
    menus: MenuItem[];
  }
  
  export const Lists: ListItem[] = [
    {
      id: 'f1',
      store: 'おむすびすみす',
      title: 'おむすび/あげもち/その他 ...',
      img: 'https://scontent.cdninstagram.com/v/t51.29350-15/449874604_366055289840938_5253800520744367168_n.jpg?stp=cp6_dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi43MjB4NzIwLnNkci5mMjkzNTAifQ&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=gfrmvAEHH9wQ7kNvgFF2X-T&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzQwNTA1OTkwODM3ODAzMjYyNA%3D%3D.2-ccb7-5&oh=00_AYDzzz5dpmRz5Y2vPb9tI2570qAxEbf_3_zzJ9E0L7nWYQ&oe=669902FA&_nc_sid=10d13b',
      description: '【2018/12 北海道で初のおむすびキッチンカー】全国各地の魅力的なヒト・コト、モノを結ぶおむすび屋。空色のおむすびワゴン（移動販売車）と恵庭のテイクアウト店舗の２拠点で営業。',
      menus: [
        { name: 'おむすび各種', price: '￥250 ~ 450', img: 'https://scontent-nrt1-2.cdninstagram.com/v/t51.29350-15/429164349_5611867352270343_1896501995048681769_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent-nrt1-2.cdninstagram.com&_nc_cat=103&_nc_ohc=CWEkHxgfsb0Q7kNvgE04PIA&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MzMwODEwNjI0MzQzNTkwMTE3NQ%3D%3D.2-ccb7-5&oh=00_AYDPOpN6DP2iXs8D6bD8JohFI5lGJQhfP6_xnWoOdRCmjw&oe=6698FCCB&_nc_sid=b41fef' },
        { name: '冷やしどて焼き', price: '￥500', img: 'https://scontent-nrt1-2.cdninstagram.com/v/t51.2885-19/412689000_256002957302049_8662453406569871074_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-nrt1-2.cdninstagram.com&_nc_cat=109&_nc_ohc=FMloZi_TLZ8Q7kNvgFm7BOV&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYAI4PhqsDyUhG5v2qUET6Qte38vEB5TfRK5Rs8SLXPd5g&oe=6698FE57&_nc_sid=8b3546' },
        { name: 'あげもち', price: '￥300', img: 'https://scontent-nrt1-2.cdninstagram.com/v/t51.2885-19/412689000_256002957302049_8662453406569871074_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-nrt1-2.cdninstagram.com&_nc_cat=109&_nc_ohc=FMloZi_TLZ8Q7kNvgFm7BOV&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYAI4PhqsDyUhG5v2qUET6Qte38vEB5TfRK5Rs8SLXPd5g&oe=6698FE57&_nc_sid=8b3546' },
        { name: 'ペットボトルドリンク', price: '￥150', img: 'https://scontent-nrt1-2.cdninstagram.com/v/t51.2885-19/412689000_256002957302049_8662453406569871074_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-nrt1-2.cdninstagram.com&_nc_cat=109&_nc_ohc=FMloZi_TLZ8Q7kNvgFm7BOV&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYAI4PhqsDyUhG5v2qUET6Qte38vEB5TfRK5Rs8SLXPd5g&oe=6698FE57&_nc_sid=8b3546' },
      ]
    },
    {
      id: 'f2',
      store: 'Big mams pie',
      title: 'パイ各種/ソーセージロール',
      img: '/NO.webp',
      description: 'NoDescription',
      menus: [
        { name: 'パイ各種(主食系)', price: '￥300 ~ 350', img: '/NO.webp' },
        { name: 'パイ各種(デザート系)', price: '￥250 ~ 300', img: '/NO.webp' },
        { name: 'ソーセージロール', price: '￥500', img: '/NO.webp' },
      ]
    },
    {
        id: 'f3',
        store: '夕張マルシェ',
        title: 'クレープ/カットメロン/その他 ...',
        img: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.29350-15/362301094_1147167763352786_8165932192539642024_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMTA3eDgzMC5zZHIuZjI5MzUwIn0&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=u05Pb2oc-LcQ7kNvgE5wxjG&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MzE1MzIwMTQ1NDQ3MzcxOTQwNQ%3D%3D.2-ccb7-5&oh=00_AYARienTPE5Q307T27AI9vH7EAk7FtJhfoBl8yfdDKnTaA&oe=6698EAEC&_nc_sid=b41fef',
        description: '「北海道 夕張のおいしい」をたくさんの人にお届けしたいというコンセプトでキッチンカー、イベント、催事出店をしています🚛🌟夕張市を始め夕張郡の食材にこだわり、道内外どこへでもその美味しさを伝えに行きます🚛💨',
        menus: [
          { name: '夕張産長いも入りクレープ各種', price: '￥400 ~ 800', img: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.29350-15/350903959_1564316214397312_3507955118924636253_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMTY5eDExNjkuc2RyLmYyOTM1MCJ9&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=zZWXoxXKQBYQ7kNvgHX1otF&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MzExNjc1Mjc5MTAzMTU0MDc5MA%3D%3D.2-ccb7-5&oh=00_AYBl50eNgbj5QxnAJtyi0LfQV7DU6OsVUUxvAWWUpy8UgA&oe=6698F68A&_nc_sid=b41fef' },
          { name: '夕張メロン カットメロン', price: '￥600', img: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.29350-15/289811934_590577029090192_8414484730380291481_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMTcxeDExNjkuc2RyLmYyOTM1MCJ9&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=GWNdWujMdKwQ7kNvgEceftn&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=Mjg2ODI3ODAxNDg4Mjg1Mjc5OQ%3D%3D.2-ccb7-5&oh=00_AYBWbjluvS3UIsgh8XBvYm1DR-Nm81i7f0nrcWTyIyqb8Q&oe=6698FAE2&_nc_sid=b41fef' },
          { name: 'ドリンク各種', price: '￥450 ~ 600', img: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.29350-15/367010885_1472609013489705_1447288857803272407_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=SDWEPjh6_oQQ7kNvgEKow1c&gid=37a7e9b1242149e4972532c34475b1db&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MzE2OTY2NTI5MTAyODU3NDAwOA%3D%3D.2-ccb7-5&oh=00_AYAKh4UBULacjEyw5nUsCgx0ZS0RsJqMGZVcJTx77sBhBg&oe=6698EEC3&_nc_sid=b41fef' },
        ]
      },
      {
        id: 'f4',
        store: '北海道ベビーカステラ本舗 まる福堂',
        title: 'ベビーカステラ',
        img: 'https://scontent-nrt1-1.cdninstagram.com/v/t39.30808-6/449723525_18087705070456511_3273227696361779010_n.jpg?stp=dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuaGRyLmYzMDgwOCJ9&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=111&_nc_ohc=sdaGcNswfT8Q7kNvgHAegrM&gid=e59ed04d0edf4b838365ee4e58b1922c&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzQwNDY3MzE2OTIxMTI5ODc5NA%3D%3D.2-ccb7-5&oh=00_AYB_sCPFcGHLUssjjFuEFgxdExR4zPlB9pE0mzH6WrdMOA&oe=6698F007&_nc_sid=ee9879',
        description: 'ベビーカステラを北海道素材をメインにこだわって作っています😊札幌近郊を中心に手作りキッチンカーで移動販売♪冷めても美味しい福珠カステラで笑顔になっていただけますように✨',
        menus: [
          { name: 'ベビーカステラ (32玉)', price: '￥1,000', img: 'https://scontent-nrt1-1.cdninstagram.com/v/t39.30808-6/444204593_18082947463456511_597826762661658452_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMTY5eDExNjkuc2RyLmYzMDgwOCJ9&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=111&_nc_ohc=AkG6xY-wbXsQ7kNvgEljNOA&edm=ABmJApAAAAAA&ccb=7-5&ig_cache_key=MzM3MDUxMTE2NzE4MDc0NTM1MA%3D%3D.2-ccb7-5&oh=00_AYBdcSw0ZboNtbPLTmRKuKUGSySAUjiMa3J2Gzyo-_9ngA&oe=66991B12&_nc_sid=b41fef' },
          { name: 'ベビーカステラ (15玉)', price: '￥500', img: 'https://scontent-nrt1-1.cdninstagram.com/v/t39.30808-6/444204593_18082947463456511_597826762661658452_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMTY5eDExNjkuc2RyLmYzMDgwOCJ9&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=111&_nc_ohc=AkG6xY-wbXsQ7kNvgEljNOA&edm=ABmJApAAAAAA&ccb=7-5&ig_cache_key=MzM3MDUxMTE2NzE4MDc0NTM1MA%3D%3D.2-ccb7-5&oh=00_AYBdcSw0ZboNtbPLTmRKuKUGSySAUjiMa3J2Gzyo-_9ngA&oe=66991B12&_nc_sid=b41fef' },
        ]
      },
      {
        id: 'f5',
        store: 'エルフグリーン',
        title: 'ポップコーン',
        img: '/NO.webp',
        description: 'NoDescruption',
        menus: [
          { name: 'ポップコーン', price: '￥-', img: '/NO.webp' },
        ]
      },
      {
        id: 'f6',
        store: 'ハルキッチン',
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
        title: '激うまフランクフルト',
        img: '/fNO.webp',
        description: 'NoDescruption',
        menus: [
          { name: 'フランクフルト', price: '￥-', img: '/NO.webp' },
        ]
      },
  ];
  