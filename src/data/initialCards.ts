import { Flashcard } from '../types/flashcard';

/**
 * 식품영양학 전공자를 위한 엄선된 핵심 10종 시드 데이터
 * (식품위생학 5문항, 영양학 5문항)
 */
export const initialCards: Flashcard[] = [
  {
    id: 'seed-1',
    category: '식품위생학',
    question: '어패류 생식 시 주로 발생하며, 호염성(염분 2~3%에서 잘 증식) 특징을 가진 식중독균은?',
    answer: '장염비브리오균 (Vibrio parahaemolyticus)',
    tip: '민물(담수)에 매우 취약하므로 수돗물로 깨끗이 세척하고, 5℃ 이하 저온 보관 및 60℃ 이상 가열(15분)이 필수 예방법입니다.',
    status: 'unseen',
  },
  {
    id: 'seed-2',
    category: '식품위생학',
    question: '화농성 질환자의 손을 통해 오염되며, 내열성 장독소(Enterotoxin)를 생성하여 100℃에서 30분 가열해도 파괴되지 않는 식중독균은?',
    answer: '황색포도상구균 (Staphylococcus aureus)',
    tip: '독소형 식중독의 대표 주자로, 잠복기가 1~6시간(평균 3시간)으로 매우 짧습니다. 화농성 상처가 있는 조리사는 절대 조리에 참여해선 안 됩니다!',
    status: 'unseen',
  },
  {
    id: 'seed-3',
    category: '식품위생학',
    question: '통조림, 소시지 등 혐기성 밀폐식품에서 주로 발생하며 치명적인 신경독소(Neurotoxin)를 생성하는 편성 혐기성 아포형성균은?',
    answer: '보툴리누스균 (Clostridium botulinum)',
    tip: '독소 자체는 열에 약해 80℃에서 30분 또는 100℃에서 몇 분 가열하면 불활성화되나, 아포(Spore)는 내열성이 강해 120℃ 4분 이상 고압증기살균이 필요합니다.',
    status: 'unseen',
  },
  {
    id: 'seed-4',
    category: '식품위생학',
    question: '겨울철 어패류(굴 등) 섭취나 오염된 지하수로 감염되며, 열과 알코올에 강해 염소계 소독제(차아염소산나트륨)로 소독해야 하는 급성 위장관염 바이러스는?',
    answer: '노로바이러스 (Norovirus)',
    tip: '소량의 바이러스 입자(10~100개)로도 감염될 정도로 감염력이 높습니다. 85℃ 이상에서 1분 이상 중심부까지 충분히 익혀 먹어야 합니다.',
    status: 'unseen',
  },
  {
    id: 'seed-5',
    category: '식품위생학',
    question: '땅콩, 옥수수 등 곡류에 번식하는 Aspergillus flavus 곰팡이가 생성하며, 간암을 유발하는 1급 발암물질인 곰팡이독(Mycotoxin)은?',
    answer: '아플라톡신 (Aflatoxin B1)',
    tip: '열에 매우 안정하여 일반적인 조리 가열(268℃ 분해)로는 전혀 파괴되지 않으므로 곰팡이가 핀 곡류나 견과류는 전량 폐기해야 합니다.',
    status: 'unseen',
  },
  {
    id: 'seed-6',
    category: '영양학',
    question: '탄수화물 대사 조효소(TPP)의 구성 성분으로, 도정된 백미를 주식으로 할 때 결핍되어 각기병(Beriberi)이나 베르니케-코르사코프 증후군을 유발하는 비타민은?',
    answer: '비타민 B1 (티아민, Thiamin)',
    tip: '피루브산(Pyruvate)이 아세틸-CoA로 전환될 때 필수 탈탄산 반응에 관여합니다. 알코올 중독자에게 결핍이 흔하게 나타납니다.',
    status: 'unseen',
  },
  {
    id: 'seed-7',
    category: '영양학',
    question: '체내에서 1,25-(OH)₂-D₃(활성형 칼시트리올)로 전환되어 소장의 칼슘 및 인 흡수를 촉진하며, 결핍 시 어린이에게 구루병, 성인에게 골연화증을 유발하는 지용성 비타민은?',
    answer: '비타민 D (콜레칼시페롤)',
    tip: '피부에서 자외선(UVB)을 받아 7-디히드로콜레스테롤로부터 합성되며, 간(25번 탄소)과 신장(1번 탄소)에서 두 번 수산화되어 활성화됩니다.',
    status: 'unseen',
  },
  {
    id: 'seed-8',
    category: '영양학',
    question: '핵산 합성 및 적혈구 형성에 필수적이며, 임신 초기 결핍 시 태아의 신경관 결손증(NTDs) 및 거대적혈구성 빈혈을 유발하는 수용성 비타민은?',
    answer: '엽산 (Folic Acid, 비타민 B9)',
    tip: '비타민 B12(코발라민)와 상호작용하므로 B12 결핍 시에도 이차적으로 엽산 결핍 증상(거대적혈구성 빈혈)이 나타날 수 있음에 유의하세요!',
    status: 'unseen',
  },
  {
    id: 'seed-9',
    category: '영양학',
    question: '단백질-에너지 영양불량증(PEM) 중, 열량은 비교적 유지되나 단백질이 극단적으로 부족하여 알부민 저하로 인한 복부 부종이 두드러지는 질환은?',
    answer: '콰시오커 (Kwashiorkor)',
    tip: '비교: "마라스무스(Marasmus)"는 열량과 단백질이 모두 극심하게 결핍되어 피하지방이 소실되고 뼈와 가죽만 남는 수척 증상을 보입니다.',
    status: 'unseen',
  },
  {
    id: 'seed-10',
    category: '영양학',
    question: '체내에서 합성되지 않아 반드시 식품으로 섭취해야 하는 다가불포화지방산으로, 오메가-6계열과 오메가-3계열의 대표적인 필수 지방산 2가지는?',
    answer: '리놀레산 (Linoleic acid, ω-6) & 알파-리놀렌산 (α-Linolenic acid, ω-3)',
    tip: '리놀레산은 식물성 기름(대두유, 옥수수유)에 풍부하며 아라키돈산의 전구체이고, 알파-리놀렌산은 들기름, 아마씨유에 풍부하며 EPA/DHA의 전구체입니다.',
    status: 'unseen',
  },
];
