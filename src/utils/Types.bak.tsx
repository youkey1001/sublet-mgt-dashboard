export const ItemTypes = ['item' as const];
export const GroupTypes = ['mission', 'values', 'premise'] as const;
export type ItemType = (typeof ItemTypes)[number];
export type GroupType = (typeof GroupTypes)[number];
export type Contents = {
  title: string;
  memo?: string;
}
export type Item = {
  id: number;
  type: ItemType;
  group: GroupType;
  contents: Contents;
}
export type ItemWithIndex = Item & { index: number };
export type MoveHandler = (dragIndex: number, targetIndex: number, groupType: GroupType) => void;
export const TitleMap = {
  mission: 'Mission',
  values: 'Values',
  premise: 'Premise',
} as const;

export const items: Item[] = [{
  id: 1, // card id :SC10cWDz9zB0jCsPMGPr
  type: 'item', // card
  group: 'mission', // list id :7UgMqwAJ0ueRfnniYT0S
  contents: {
    title: '出会いからイノベーションを生み出す',
    memo: 'いつの時代も、世界を動かしてきたのは人と人の出会いです。私たちは出会いが持つ可能性を再発見し、未来につなげることでビジネスを変えていきます。イノベーションにつながる新しい出会いを生み出す。出会いの力でビジネスの課題にイノベーションを起こす。そして、名刺からはじまる出会い、そのもののあり方を変えていきます。',
  },
}, {
  id: 2,  // 3IYwG7t0cxsPt64kkz4x
  type: 'item', // card
  group: 'values', // list id : XtMjszb8JHSVa7URnvuC
  contents: {
    title: '仕事に向き合い、仕事を楽しむ',
    memo: '仕事とは決してラクなものではありません。時につらいことや大変なこともあります。だからといって、そこから目を背け、手を抜いていては本物の達成感や自己成長を得ることはできません。仕事における楽しさとはラクをすることではなく、小さな努力を一つずつ積み重ね、目の前の仕事に本気で向き合った先にこそ実感できるものだと考えています。',
  },
}, {
  id: 3,
  type: 'item',
  group: 'values',
  contents: {
    title: '強みを活かし、成果を出す',
    memo: '私たちにとっての強みとは「肩の力を入れず無意識にできること」と定義しています。学習して身につけたスキルではなく、人それぞれの性質のようなものです。弱みを克服することに重点を置くのではなく、目の前の仕事に自身の強みや同僚の強みを活かし、それぞれの持っている能力を最大限に発揮することでスピーディーに成果を上げていくのです。',
  },
}, {
  id: 4,
  type: 'item',
  group: 'values',
  contents: {
    title: '具体的に想像せよ',
    memo: '議論はときに、一般論や机上の空論の枠を出ず、具体的にならないことがあります。この選択によってどんなことが起こるのか。体験の当事者となったとき、本当にそれは現実的なのか。物事の輪郭がはっきりしていなければ本質を捉えることはできません。より良い選択をするためには、今よりもさらに一歩踏み込み、自身の考えに具体性を問う必要があります。',
  },
}, {
  id: 5,
  type: 'item',
  group: 'values',
  contents: {
    title: '意思と意図をもって判断する',
    memo: '当社を創っているのは私たち自身です。誰かが決めたことを盲目的に遂行するのではなく、どうすべきかを一人ひとりが判断するのです。私たちはどこへ向かっているのか、どうなりたいのか、そのためにはどうすべきなのか。一人ひとりの意思と意図が当社を動かし続けています。そこに意思と意図はあるのか、その問いかけこそが新しい価値を生み出す原動力となっています。',
  },
}, {
  id: 6,
  type: 'item',
  group: 'values',
  contents: {
    title: '遅いより速い方がいい',
    memo: '物事を実行するとき、遅いよりも速い方がいい。それは普遍的な考え方であり、何かを犠牲にするものではありません。何も考えずに走るということでも、反射的に行動するということでもないのです。考え抜いた末に、現時点で結論を出す必要がないものもあるかもしれません。具体的な想像の上に決断したことを、素早く実行していく。時間を有限と捉える心構えです。',
  },
}, {
  id: 7,
  type: 'item',
  group: 'values',
  contents: {
    title: '感謝と感激を大切にする',
    memo: '当社にはさまざまな部門・役割のメンバーが存在します。しかし実現しようとするミッションは誰もが同じです。この壮大なミッションを実現するためには全員の協力が必要不可欠なのです。自身の仕事が同僚の仕事とつながり、目指すミッションへと続いています。だからこそ他部門の成果を褒め称え、同僚に感謝を伝えられる7人8脚の精神を大切にしています。',
  },
}, {
  id: 8,
  type: 'item',
  group: 'values',
  contents: {
    title: 'Lead the customer',
    memo: 'イノベーションとは、これまでの常識を覆すようなものです。そんな誰もが体験したことのない新しい世界こそが、私たちの導く未来です。それは自身の信念を持たず、世の中の常識ばかりに目を向けていては、決してたどりつけません。道なき道を切り拓き、目指す未来に対して本当に価値あるものを提供し続けることが、私たちのあるべき姿なのです。',
  },
}, {
  id: 9,
  type: 'item',
  group: 'values',
  contents: {
    title: '変化を恐れず、挑戦していく',
    memo: '変化にはリスクが伴います。そのリスクを正しく認識していなければ、成果を得ることはできません。変化すること・挑戦することが目的ではなく、その先に何を得るのかが重要です。議論の末、変化しないということもまた一つの結論かもしれません。その先にある恐れを認識しながら、それでも挑戦していく。私たちはこのミッションに向かう挑戦者であることを忘れてはいけません。',
  },
}, {
  id: 10,
  type: 'item',
  group: 'premise',
  contents: {
    title: 'セキュリティと利便性を両立させる',
    memo: 'セキュリティは当社にとっての前提条件です。セキュリティなくして当社は存続しえません。一方で、当社が提供するクラウドサービスは世の中をより便利にするためのもので、多くのケースでセキュリティと利便性は相反します。大事なことは、天秤を「セキュリティ」や「利便性」に傾かせることなく、双方を高度にバランスさせていくことだと捉えています。',
  },
}];