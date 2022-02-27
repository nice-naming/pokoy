import { ReactElement } from "react"
import { SlideRenderProps } from "react-swipeable-views-utils"
import { SwipeableView } from "shared/styles/app.styles"
import { StyledImg } from "./about-page.styles"

import firstStepImg from "./tutor-step-1.png"
import secondStepImg from "./tutor-step-2.png"
import fourthStepImg from "./tutor-step-4.png"
import fifthStepImg from "./tutor-step-5.png"

export function tutorialSlideRenderer({
  index,
  key,
}: SlideRenderProps): ReactElement {
  switch (index) {
    case 0:
      return <TutorialFirstStep key={key} />
    case 1:
      return <TutorialSecondStep key={key} />
    case 2:
      return <TutorialThirdStep key={key} />
    case 3:
      return <TutorialFourthStep key={key} />
    case 4:
      return <TutorialFifthStep key={key} />
    default:
      return <p>Этот шаг ещё не сделан 🤷‍♂️</p>
  }
}

const TutorialFirstStep: React.FC = () => {
  return (
    <SwipeableView>
      <h3>Начало сессии</h3>
      <StyledImg src={firstStepImg} alt="first step" />
      <p>Вы запускаете приложение и видете большой круг со спиралью.</p>
    </SwipeableView>
  )
}

const TutorialSecondStep: React.FC = () => {
  return (
    <SwipeableView>
      <h3>Таймер</h3>
      <StyledImg src={secondStepImg} alt="second step" />
      <p>
        Вы нажимаете на круг и начинается сессия. Появится обратный таймер всего
        на одну минуту.
      </p>
    </SwipeableView>
  )
}

const TutorialThirdStep: React.FC = () => {
  return (
    <SwipeableView>
      <h3>Нарастающие таймеры</h3>
      <StyledImg src={fourthStepImg} alt="fourt step" />
      <p>
        После окончания первого таймера вы услышите звуковой сигнал и
        автоматически перейдёте на следующий этап, так пока вы снова не нажмёте
        на круг.
      </p>
      <p>
        Первые три этапа длятся по минуте, но далее идёт постепенный прирост
        длительности в среднем в 1.6 раз.
      </p>
    </SwipeableView>
  )
}

const TutorialFourthStep: React.FC = () => {
  return (
    <SwipeableView>
      <h3>Окончание сессии</h3>
      <p>
        После повторного нажатия ваша сессия окончена. В статистику запишется
        последний пройденный этап.
      </p>
      <p>
        Если вы отжали таймер спустя некоторое время после сигнала, то
        длительность сессии будет округлена вниз до ближайшего этапа.
      </p>
    </SwipeableView>
  )
}

const TutorialFifthStep: React.FC = () => {
  return (
    <SwipeableView>
      <h3>Статистика</h3>
      <StyledImg src={fifthStepImg} alt="fifth step" />
      <p>
        Если вы сделаете свайп вправо или нажмёте на переключатель экранов (••),
        то попадёте на экран вашей статистики.
      </p>
      <p>
        Здесь вы увидите сумму практики в часах, среднюю сессию в минутах и
        сколько дней до следующего уровня практики.
      </p>
    </SwipeableView>
  )
}
