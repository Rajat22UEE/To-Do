export default function TutorialPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-8 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-6">
        <h1 className="text-4xl font-bold text-blue-700 text-center">React To-Do App Tutorial</h1>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">🎯 Objective</h2>
          <p className="text-lg">
            Handle forms and learn side effects using <code className="font-mono bg-gray-100 px-1 rounded">useEffect</code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">📘 Learn</h2>
          <ul className="list-disc pl-6 text-lg space-y-1">
            <li><strong>Controlled components</strong> for form inputs</li>
            <li><strong>useEffect</strong> for side effects (e.g., fetching data, updating UI)</li>
            <li><strong>Basic form validation</strong> (e.g., disallow empty tasks)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">🔗 Resources</h2>
          <ul className="list-disc pl-6 text-lg text-blue-500 space-y-1">
            <li><a href="https://reactjs.org/docs/forms.html" target="_blank" className="underline">React Docs: Forms</a></li>
            <li><a href="https://reactjs.org/docs/hooks-effect.html" target="_blank" className="underline">React Docs: useEffect</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">🧩 Task</h2>
          <p className="text-lg mb-2">Enhance the to-do list app by implementing the following:</p>
          <ul className="list-decimal pl-6 text-lg space-y-2">
            <li>
              Add a <strong>form to input tasks</strong> with basic validation (e.g., no empty tasks).
            </li>
            <li>
              Use <code className="font-mono bg-gray-100 px-1 rounded">useEffect</code> to:
              <ul className="list-disc pl-6 mt-1">
                <li>Save tasks to <strong>localStorage</strong></li>
                <li>Load tasks from localStorage <strong>on component mount</strong></li>
              </ul>
            </li>
            <li>
              Style the form with <strong>Tailwind CSS</strong>:
              <ul className="list-disc pl-6 mt-1">
                <li>Rounded input fields</li>
                <li>Styled submit button</li>
              </ul>
            </li>
          </ul>
        </section>

        <footer className="text-center pt-4 border-t mt-6 text-sm text-gray-500">
          Happy coding! 🚀
        </footer>
      </div>
    </main>
  )
}
