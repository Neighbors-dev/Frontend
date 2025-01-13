import Header from '@/components/Header'
import { TERMS_OF_SERVICE } from '@/constants/terms'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'

export default function Terms() {
  useBodyBackgroundColor('neutral-90')
  return (
    <>
      <Header title="서비스 이용 약관" className="bg-neutral-90" />
      <main className="content-padding-small flex grow flex-col">
        <h2 className="headline-small my-4 text-white">서비스 이용 약관</h2>
        <section className="flex flex-col gap-5 text-neutral-40">
          {TERMS_OF_SERVICE.map((term) => (
            <article key={term.title}>
              <h3 className="title-small">{term.title}</h3>
              <div className="body-medium">
                {Array.isArray(term.contents) ? (
                  <ol>
                    {term.contents.map((content, index) => (
                      <li key={`${term.title}-${index}`}>
                        <div className="flex gap-1.5 pl-1.5">
                          <div>{index + 1}.</div>
                          <p>{content.main}</p>
                        </div>
                        <ul>
                          {content.details?.map((detail, index2) => (
                            <li key={`${term.title}-${index}-${index2}`} className="flex">
                              <div className="pl-7 pr-1.5">•</div>
                              <p>{detail}</p>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p>{term.contents}</p>
                )}
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  )
}
