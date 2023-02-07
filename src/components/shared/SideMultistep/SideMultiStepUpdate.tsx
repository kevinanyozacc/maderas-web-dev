import { Dispatch, ReactElement, SetStateAction, SVGProps } from 'react'
import SideMultistepOptionUpdate from './SideMultiStepOptionUpdate'

export interface Step {
  desc?: string
  label: string
  component: ReactElement
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement
  estObs: any
}

interface Props {
  steps: Step[]
  stepper: number
  title?: string
  desc?: string,
  setStep?: Dispatch<SetStateAction<number>>
}

const SideMultistepUpdate = ({ title, desc, stepper, steps, setStep }: Props) => {
  return (
    <div>
      <div className="pb-8 border-b dark:border-b-slate-700">
        <h1 className="mb-1 title-6 md:title-5 dark:text-white">{title}</h1>
        <p className="paragraph-2 md:paragraph-1 text-slate-400 dark:text-slate-500">
          {desc}
        </p>
      </div>

      <div className="md:grid grid-cols-[300px_minmax(0,_1fr)]">
        {/* SIDE STEPS DESKTOP */}
        <div className="flex-col hidden pt-10 border-r md:flex dark:border-r-slate-700">
          <div className="grid items-center grid-cols-1 max-w-[300px] mx-auto gap-y-8">
          {/* <div className="grid items-center grid-cols-[minmax(0,_1fr)_100px] max-w-[300px] mx-auto gap-y-10"> */}
            {Array.isArray(steps) &&
              steps.map((step, i) => (
                <SideMultistepOptionUpdate
                  key={i}
                  {...step}
                  isActive={stepper === i}
                  isComplete={step.estObs === 'PENDIENTE' || step.estObs === 'VALIDADO'}
                  colorObs={step.estObs}
                  onClick={() => setStep?.(i)}
                />
              ))}
          </div>
        </div>

        {/* Children */}
        <div className="flex flex-col gap-6 pt-3 md:pt-10 md:px-10">
          <div className="md:hidden">
            <SideMultistepOptionUpdate isActive isMobile {...steps[stepper]} />
          </div>

          <p className="hidden dark:text-slate-400 text-slate-400 md:block">
            Paso {stepper + 1}/{steps.length}
          </p>

          {steps[stepper].component}
        </div>
      </div>
    </div>
  )
}

export default SideMultistepUpdate
