import { ComplexPageForm } from '@/components/complex-page-form'

export default function SendModel() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
            <div className="container mx-auto p-8">
                <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">Project Analysis</h1>
                <ComplexPageForm />
            </div>
        </div>
    )
}

