import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents()
  })

  function setup() {
    const fixture = TestBed.createComponent(AppComponent)

    return {
      fixture,
      component: fixture.componentRef,
    }
  }

  it('should create the app', () => {
    const { component } = setup()

    expect(component).toBeTruthy()
  })
})
